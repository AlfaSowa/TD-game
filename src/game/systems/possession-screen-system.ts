import { Castle, Forest } from '../entities'
import { Game } from '../game'
import { LevelingSystem } from './leveling-system'
import { ScreensSystem } from './screens-system'
import { System } from './types'

export class PossessionScreenSystem implements System {
  public static SYSTEM_ID = 'castle'

  game!: Game

  castle!: Castle
  forest!: Forest

  init() {
    const config = this.game.systems.get(LevelingSystem).getSystemData('buildings', 'Castle')

    this.castle = new Castle({ game: this.game, config })
    this.forest = new Forest({ game: this.game })

    this.game.systems.get(ScreensSystem).addContainer(this.castle, 'possession')
    this.game.systems.get(ScreensSystem).addContainer(this.forest, 'possession')

    this.castle.init()
    this.forest.init()
  }

  update() {
    this.castle.update()
    this.forest.update()
  }
}
