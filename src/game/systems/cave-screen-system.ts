import { Container } from 'pixi.js'
import { Signal } from 'typed-signals'

import { DungeonMap } from '../dungeon'
import { CavePoint } from '../entities'
import { Game } from '../game'
import { ScreensSystem } from './screens-system'
import { System } from './types'

const POINTS = 3
export class CaveScreenSystem implements System {
  public static SYSTEM_ID = 'cave-screen-system'

  game!: Game

  caveRoads: Container = new Container()

  public signals = {
    onUpdateMainContent: new Signal<(container: Container) => void>(),
    onResetMainContent: new Signal<() => void>()
  }

  constructor() {
    this.signals.onUpdateMainContent.connect((container) => {
      const screen = this.game.systems.get(ScreensSystem).getScreen('cave')

      screen.updateContent(container)
    })

    this.signals.onResetMainContent.connect(() => {
      const screen = this.game.systems.get(ScreensSystem).getScreen('cave')

      screen.resetMainContainer()
    })
  }

  loadMap() {
    for (let i = 0; i < POINTS; i++) {
      const point = new CavePoint({ game: this.game })
      point.init()
      point.position.set(this.game.app.canvas.width / 2 - 50, i * 200)

      point.clicked(() => {
        const map = new DungeonMap({ game: this.game })

        this.signals.onUpdateMainContent.emit(map)

        map.init()
      })

      this.caveRoads.addChild(point)
    }

    this.signals.onUpdateMainContent.emit(this.caveRoads)
  }

  update() {}
}
