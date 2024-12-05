import { Game } from '../game'
import { Castle } from '../objects'
import { ScreensSystem } from './screens-system'
import { System } from './types'

export class CastleSystem implements System {
  public static SYSTEM_ID = 'castle'

  game!: Game

  castle!: Castle

  init() {
    this.castle = new Castle({ game: this.game })

    this.game.systems.get(ScreensSystem).addContainer(this.castle, 'possession')

    this.castle.init()
  }

  update() {
    this.castle.update()
  }
}
