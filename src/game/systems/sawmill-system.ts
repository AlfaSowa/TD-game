import { Sawmill } from '../entities'
import { Game } from '../game'
import { ScreensSystem } from './screens-system'
import { System } from './types'

export class SawmillSystem implements System {
  public static SYSTEM_ID = 'sawmill'

  game!: Game

  sawmill!: Sawmill

  init() {
    this.sawmill = new Sawmill({ game: this.game })
    console.log(this.sawmill)

    this.game.systems.get(ScreensSystem).addContainer(this.sawmill, 'possession')

    this.sawmill.init()
  }

  update() {
    this.sawmill.update()
  }
}
