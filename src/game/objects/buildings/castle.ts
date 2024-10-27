import { Graphics } from 'pixi.js'
import { events } from '../../../core'
import { Game } from '../../../game'
import { OPEN_VILLAGE_MENU, TAIL_SIZE, colorTheme } from '../../constants'
import { BaseBuild } from './base'

interface ICastle {
  game: Game
}

export class Castle extends BaseBuild {
  size: number = TAIL_SIZE * 10
  walls: number[][] = []

  constructor({ game }: ICastle) {
    super({ game })

    // this.position.set(game.app.canvas.width / 2 - this.size / 2, game.app.canvas.height / 2 - this.size / 2)
    this.position.set(game.app.canvas.width / 2 - this.size / 2 + 60, game.app.canvas.height / 2 - this.size / 2 - 60)
    // this.position.set((game.app.canvas.width / 100) * 2, (game.app.canvas.height / 100) * 2)

    const graphics = new Graphics().rect(0, 0, this.size, this.size).fill(colorTheme.primary)

    graphics.eventMode = 'static'
    graphics.cursor = 'pointer'
    graphics.on('pointerdown', () => {
      this.handleClick()
    })

    this.addChild(graphics)

    // events.on(CHECK_CASTLE_CELL, this, (id: number) => {
    //   const cell = state.getCastleGrid.find((cell) => cell.id === id)
    //   if (cell) {
    //     console.log('CHECK_CASTLE_CELL', cell)
    //   }
    // })

    // events.on(CHECK_CELL_TO_BUY, this, (id: number) => {
    //   const cell = state.getCastleGrid.find((cell) => cell.id === id)

    //   if (cell) {
    //     console.log('CHECK_CELL_TO_BUY', cell)

    //     if (!cell.purchased && cell.price && cell.price >= 200) {
    //       const grid = state.getCastleGrid.map((item) => {
    //         if (item.id === id) {
    //           return { ...item, disable: false }
    //         }
    //         return item
    //       })

    //       state.updateCastleGrid = grid
    //     }
    //   }

    //   events.emit(UPDATE_CASTLE_GRID, state.getCastleGrid)
    // })
  }

  private handleClick() {
    events.emit(OPEN_VILLAGE_MENU, true)
  }

  update() {
    // this.ticker.update()
  }
}
