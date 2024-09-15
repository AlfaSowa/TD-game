import { Graphics } from 'pixi.js'
import { Game } from '../../../game'
import {
  CHECK_CASTLE_CELL,
  CHECK_CELL_TO_BUY,
  OPEN_CASTLE_MENU,
  TAIL_SIZE,
  UPDATE_CASTLE_GRID,
  colorTheme
} from '../../constants'
import { events, state } from '../../core'
import { BaseBuild } from './base'

// const setWalls = (wallSize: number, factor: number) => {
//   return [
//     [-wallSize * factor, 0],
//     [-wallSize * factor, wallSize],
//     [-wallSize * factor, -wallSize],
//     [wallSize * factor, 0],
//     [wallSize * factor, wallSize],
//     [wallSize * factor, -wallSize],
//     [0, wallSize * factor],
//     [wallSize, wallSize * factor],
//     [-wallSize, wallSize * factor],
//     // [-wallSize / 2, -wallSize / 2 - wallSize * factor],
//     [wallSize, -wallSize * factor],
//     [-wallSize, -wallSize * factor]
//   ]
// }

interface ICastle {
  game: Game
}

export class Castle extends BaseBuild {
  size: number = TAIL_SIZE * 2
  walls: number[][] = []

  // private grid: CastleGrid[] = [
  //   { id: 0, disable: true, price: 200 },
  //   { id: 1, disable: true, price: 200 },
  //   { id: 2, disable: true, price: 200 },
  //   { id: 3, disable: true, price: 200 },
  //   { id: 4, disable: false, price: 200 },
  //   { id: 5, disable: true, price: 200 },
  //   { id: 6, disable: true, price: 200 },
  //   { id: 7, disable: true, price: 200 },
  //   { id: 8, disable: true, price: 200 }
  // ]
  // ticker: IntervalTicker

  constructor({ game }: ICastle) {
    super({ game })

    this.position.set(game.app.canvas.width / 2 - this.size / 2, game.app.canvas.height / 2 - this.size / 2)

    // this.ticker = new IntervalTicker({ amount: 0, value: 1, container: this })

    this.eventMode = 'static'
    this.cursor = 'pointer'
    this.on('pointerdown', () => this.handleClick())

    this.addChild(new Graphics().rect(0, 0, this.size, this.size).fill(colorTheme.primary))

    events.on(CHECK_CASTLE_CELL, this, (id: number) => {
      const cell = state.getCastleGrid.find((cell) => cell.id === id)
      if (cell) {
        console.log('CHECK_CASTLE_CELL', cell)
      }
    })

    events.on(CHECK_CELL_TO_BUY, this, (id: number) => {
      const cell = state.getCastleGrid.find((cell) => cell.id === id)

      if (cell) {
        console.log('CHECK_CELL_TO_BUY', cell)

        if (cell.disable && cell.price >= 200) {
          const grid = state.getCastleGrid.map((item) => {
            if (item.id === id) {
              return { ...item, disable: false }
            }
            return item
          })

          state.updateCastleGrid = grid
        }
      }

      events.emit(UPDATE_CASTLE_GRID, state.getCastleGrid)
    })
  }

  private handleClick() {
    events.emit(OPEN_CASTLE_MENU, true)
    events.emit(UPDATE_CASTLE_GRID, state.getCastleGrid)
  }

  update() {
    // this.ticker.update()
  }
}
