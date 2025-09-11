import { Container } from 'pixi.js'
import { Signal } from 'typed-signals'
import { CaveRoads } from '../entities'
import { Game } from '../game'
import { ScreensSystem } from './screens-system'
import { System } from './types'

export class CaveScreenSystem implements System {
  public static SYSTEM_ID = 'cave-screen-system'

  game!: Game

  caveRoads!: CaveRoads

  public signals = {
    onUpdateMainContent: new Signal<(container: Container) => void>()
  }

  constructor() {
    this.signals.onUpdateMainContent.connect((container) => {
      const screen = this.game.systems.get(ScreensSystem).getScreen('cave')

      screen.updateContent(container)
    })
  }

  init() {
    this.caveRoads = new CaveRoads({ game: this.game })
    this.caveRoads.init()
  }

  update() {}
}
