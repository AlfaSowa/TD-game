import { Container, Graphics } from 'pixi.js'
import { Game } from '../game'
import { Vector2, heuristic, removeElementFromArray } from '../utils'
import { TAIL_SIZE } from '../constants'

interface IPathfinder {
  game: Game
  allowDiagonals?: boolean
}

export class Pathfinder {
  game: Game

  openSet: Spot[] = []
  closedSet: Spot[] = []

  grid: Spot[][] = []

  cols: number = 0
  rows: number = 0

  start: any = Spot
  end: any = Spot

  lastCheckedNode!: Spot

  allowDiagonals: boolean

  isFineshed: boolean = false

  constructor({ game, allowDiagonals }: IPathfinder) {
    this.game = game

    this.allowDiagonals = allowDiagonals || false

    this.cols = Math.floor(this.game.scene.app.canvas.width / TAIL_SIZE)
    this.rows = Math.floor(this.game.scene.app.canvas.height / TAIL_SIZE)
  }

  init(walls: { [key: string]: { [key: string]: boolean } }) {
    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = []

      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = new Spot(i, j, !!walls[i]?.[j])
      }
    }

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].addNeighbors(this.grid)
      }
    }
  }

  addNewPath(start: Vector2, end: Vector2) {
    this.start = this.grid[start.x][start.y]
    this.end = this.grid[end.x][end.y]

    this.lastCheckedNode = this.start

    this.openSet.push(this.start)

    this.isFineshed = false
    while (!this.isFineshed) {
      this.step()
    }

    const path = new Path({ game: this.game, path: this.calcPath(this.lastCheckedNode) })

    return { path, pathId: path.id }
  }

  calcPath(endNode: Spot) {
    const path = []
    let temp = endNode

    path.push(temp)

    while (temp.previous) {
      path.push(temp.previous)
      temp = temp.previous
    }

    return path
  }

  step() {
    if (this.openSet.length > 0) {
      let pivot = 0

      for (let i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[pivot].f) {
          pivot = i
        }

        //если клетки равны по весу
        if (this.openSet[i].f === this.openSet[pivot].f) {
          //берем элемент ближайший к целе
          if (this.openSet[i].g > this.openSet[pivot].g) {
            pivot = i
          }

          if (!this.allowDiagonals) {
            if (this.openSet[i].g === this.openSet[pivot].g && this.openSet[i].vh < this.openSet[pivot].vh) {
              pivot = i
            }
          }
        }
      }

      var current = this.openSet[pivot]
      this.lastCheckedNode = current

      if (current === this.end) {
        this.isFineshed = true
        console.log('DONE!')
        return 1
      }

      removeElementFromArray(this.openSet, current)
      this.closedSet.push(current)

      for (let i = 0; i < current.neighbors.length; i++) {
        const neighbor = current.neighbors[i]

        if (!this.closedSet.includes(neighbor)) {
          var tentativeGScore = current.g + heuristic(neighbor, current, true)

          if (!this.openSet.includes(neighbor)) {
            this.openSet.push(neighbor)
          } else if (tentativeGScore >= neighbor.g) {
            continue
          }

          neighbor.g = tentativeGScore
          neighbor.f = heuristic(neighbor, this.end, true)

          neighbor.f = neighbor.g + neighbor.h
          neighbor.previous = current
        }
      }

      return 0
      //--
    } else {
      this.isFineshed = true
      console.log('no solution')
      return -1
    }
  }
}

//Path------------------------------
interface IPath {
  game: Game
  path: Spot[]
}

export class Path extends Container {
  uuid: string = '12312'
  game: Game
  path: Spot[] = []

  constructor({ game, path }: IPath) {
    super()
    this.game = game
    this.path = path

    this.game.scene.app.stage.addChild(this)

    for (let i = 0; i < path.length; i++) {
      this.addChild(
        new Graphics().rect(path[i].x * TAIL_SIZE, path[i].y * TAIL_SIZE, TAIL_SIZE, TAIL_SIZE).fill('#9e9e9e21')
      )
    }
  }

  get id() {
    return this.uuid
  }
}

//Spot------------------------------
export class Spot {
  x: number = 0
  y: number = 0

  neighbors: Spot[] = []

  g: number = 0
  f: number = 0
  h = 0
  vh = 0

  previous!: Spot

  isWall: boolean = false

  constructor(i: number, j: number, isWall: boolean) {
    this.x = i
    this.y = j

    this.isWall = isWall
  }

  addNeighbors(grid: Spot[][]) {
    //top
    if (grid[this.x]?.[this.y - 1] && !grid[this.x]?.[this.y - 1]?.isWall) {
      this.neighbors.push(grid[this.x][this.y - 1])
    }
    //bottom
    if (grid[this.x]?.[this.y + 1] && !grid[this.x]?.[this.y + 1]?.isWall) {
      this.neighbors.push(grid[this.x][this.y + 1])
    }
    //left
    if (grid[this.x - 1]?.[this.y] && !grid[this.x - 1]?.[this.y]?.isWall) {
      this.neighbors.push(grid[this.x - 1][this.y])
    }
    //right
    if (grid[this.x + 1]?.[this.y] && !grid[this.x + 1]?.[this.y]?.isWall) {
      this.neighbors.push(grid[this.x + 1][this.y])
    }
  }
}
