import { Game } from '../game'
import { removeElementFromArray } from '../utils'

type coordPosition = {
  x: number
  y: number
}

interface IPathfinder {
  game: Game
  start: coordPosition
  end: coordPosition
}

function heuristic(a: coordPosition, b: coordPosition) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export class Pathfinder {
  game: Game

  grid: Spot[][] = []
  cols: number = 0
  rows: number = 0

  openSet: Spot[] = []
  closedSet: Spot[] = []

  start: any = Spot
  end: any = Spot

  spotSize: number = 32

  constructor({ game, start, end }: IPathfinder) {
    this.game = game

    this.cols = Math.floor(this.game.scene.app.canvas.width / this.spotSize)
    this.rows = Math.floor(this.game.scene.app.canvas.height / this.spotSize)

    this.init(
      { x: Math.floor(start.x / this.spotSize), y: Math.floor(start.y / this.spotSize) },
      { x: Math.floor(end.x / this.spotSize), y: Math.floor(end.y / this.spotSize) }
    )
  }

  init(start: coordPosition, end: coordPosition) {
    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = []

      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = new Spot(i, j)
      }
    }

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].addNeighbors(this.grid)
      }
    }

    this.start = this.grid[start.x][start.y]
    this.end = this.grid[end.x][end.y]

    this.openSet.push(this.start)
  }

  findPath() {
    if (this.openSet.length > 0) {
      let pivot = 0

      for (let i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[pivot].f) {
          pivot = i
        }
      }

      let current = this.openSet[pivot]

      if (current === this.end) {
        console.log('DONE!')
      }

      removeElementFromArray(this.openSet, current)
      this.closedSet.push(current)

      for (let i = 0; i < current.neighbors.length; i++) {
        if (!this.closedSet.includes(current.neighbors[i])) {
          const tempG = current.g + 1

          if (this.openSet.includes(current.neighbors[i])) {
            if (tempG < current.neighbors[i].g) {
              current.neighbors[i].g = tempG
            }
          } else {
            current.neighbors[i].g = tempG
            this.openSet.push(current.neighbors[i])
          }

          current.neighbors[i].h = heuristic(current.neighbors[i], this.end)
          current.neighbors[i].f = current.neighbors[i].g + current.neighbors[i].h
          // current.neighbors[i].previous = current.neighbors[i]
        }
      }
    } else {
      //NO
    }

    // for (let i = 0; i < this.cols; i++) {
    //   for (let j = 0; j < this.rows; j++) {
    //     this.grid[i][j].show()
    //   }
    // }

    // for (let i = 0; i < this.closedSet.length; i++) {
    //   this.closedSet[i].show()
    // }

    // for (let i = 0; i < this.openSet.length; i++) {
    //   this.openSet[i].show()
    // }
  }
}

class Spot {
  previous: any
  x: number = 0
  y: number = 0

  f: number = 0
  g: number = 0
  h: number = 0

  neighbors: Spot[] = []

  constructor(i: number, j: number) {
    this.x = i
    this.y = j
  }

  //TODO добавить диагональных соседей
  addNeighbors(grid: Spot[][]) {
    const getNextNeighbour = (a: number, b: number) => {
      if (typeof grid?.[this.x + a]?.[this.y + b] !== 'undefined') {
        return [grid[this.x + a][this.y + b]]
      }
      return []
    }

    //без диагональных
    this.neighbors.push(
      ...[...getNextNeighbour(0, -1), ...getNextNeighbour(0, 1), ...getNextNeighbour(-1, 0), ...getNextNeighbour(1, 0)]
    )
  }

  // show() {}
}
