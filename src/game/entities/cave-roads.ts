import { Container, Graphics } from 'pixi.js'
import { Game } from '../game'
import { CaveScreenSystem } from '../systems'

export interface BaseEntityConstructor {
  game: Game
}

export class CaveRoads extends Container {
  game: Game

  constructor({ game }: BaseEntityConstructor) {
    super()
    this.game = game
  }

  init() {
    const road1 = new Graphics().rect(this.game.app.canvas.width / 2 - 50, 0, 100, 100).fill({ color: '#f1f1f1' })
    const road2 = new Graphics().rect(this.game.app.canvas.width / 2 - 50, 200, 100, 100).fill({ color: '#f1f1f1' })
    const road3 = new Graphics().rect(this.game.app.canvas.width / 2 - 50, 400, 100, 100).fill({ color: '#f1f1f1' })

    this.game.systems.get(CaveScreenSystem).signals.onUpdateMainContent.emit(road1)
    this.game.systems.get(CaveScreenSystem).signals.onUpdateMainContent.emit(road2)
    this.game.systems.get(CaveScreenSystem).signals.onUpdateMainContent.emit(road3)
  }
}
