import { Game } from '../../game'
import { TAIL_SIZE } from '../../game/constants'
import { getDistBetweenTargets, heuristic, removeElementFromArray, Vector2 } from '../../utils'

import { Spot } from './pathfinder-spot'

class Pathfinder {
  game!: Game

  openSet: Spot[] = []
  closedSet: Spot[] = []

  grid: Spot[][] = []

  cols: number = 0
  rows: number = 0

  start: any = Spot
  end: any = Spot

  lastCheckedNode!: Spot

  allowDiagonals: boolean = false

  isFinished: boolean = false

  init(game: Game) {
    this.game = game

    this.cols = this.game.app.canvas.width / TAIL_SIZE
    this.rows = this.game.app.canvas.height / TAIL_SIZE

    for (let i = 0; i < this.cols; i++) {
      this.grid[i] = []

      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = new Spot(i, j, false, this.grid)
      }
    }
  }

  find(start: Vector2, end: Vector2) {
    this.openSet = []
    this.closedSet = []

    this.start = this.grid[start.x][start.y]
    this.end = this.grid[end.x][end.y]

    this.lastCheckedNode = this.start
    this.isFinished = false

    this.openSet.push(this.start)

    while (!this.isFinished) {
      this.step()
    }

    return this.calcPath(this.lastCheckedNode)
  }

  calcPath(endNode: Spot) {
    const path: Spot[] = []
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
      let winner = 0

      for (let i = 1; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[winner].f) {
          winner = i
        }
        if (this.openSet[i].f === this.openSet[winner].f) {
          if (this.openSet[i].g > this.openSet[winner].g) {
            winner = i
          }

          if (!this.allowDiagonals) {
            if (this.openSet[i].g === this.openSet[winner].g && this.openSet[i].vh < this.openSet[winner].vh) {
              winner = i
            }
          }
        }
      }

      const current = this.openSet[winner]

      this.lastCheckedNode = current

      if (current === this.end) {
        this.isFinished = true
        console.log('DONE!')
        return 1
      }

      removeElementFromArray(this.openSet, current)
      this.closedSet.push(current)

      const neighbors = current.getNeighbors()

      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i]

        if (!this.closedSet.includes(neighbor)) {
          const tentativeGScore = current.g + heuristic<Spot>(neighbor, current, this.allowDiagonals)

          if (!this.openSet.includes(neighbor)) {
            this.openSet.push(neighbor)
          } else if (tentativeGScore >= neighbor.g) {
            continue
          }

          neighbor.g = tentativeGScore
          neighbor.h = heuristic(neighbor, this.end, this.allowDiagonals)

          if (!this.allowDiagonals) {
            neighbor.vh = getDistBetweenTargets(neighbor, this.end)
          }
          neighbor.f = neighbor.g + neighbor.h
          neighbor.previous = current
        }
      }

      return 0
      //--
    } else {
      this.isFinished = true
      console.log('no solution')
      return -1
    }
  }
}

export const pathfinder = new Pathfinder()
