import { Container } from 'pixi.js'
import { Game } from '..'
import { CastleScreen, MapScreen, PossessionScreen, TDScreen } from '../screens'

import { Signal } from 'typed-signals'
import { SystemRunner } from './system-runner'
import { System } from './types'

export type ScreensType = 'map' | 'possession' | 'td' | 'castle'
export class ScreensSystem implements System {
  public static SYSTEM_ID = 'screens'

  game!: Game

  map!: MapScreen
  possession!: PossessionScreen
  td!: TDScreen
  castle!: CastleScreen

  currentScreen!: MapScreen | PossessionScreen | TDScreen
  systems!: SystemRunner

  public signals = {
    onToggleScreen: new Signal<(type: ScreensType) => void>(),
    onViewportPauseDrag: new Signal<() => void>(),
    onViewportResumeDrag: new Signal<() => void>(),
    onFollowViewportToTarget: new Signal<() => void>()
  }

  constructor() {
    this.map = new MapScreen()
    this.possession = new PossessionScreen()
    this.td = new TDScreen()
    this.castle = new CastleScreen()

    this.currentScreen = this.possession

    this.signals.onToggleScreen.connect((type) => {
      this.currentScreen.removeFromParent()
      this.currentScreen = this[type]
      this.game.app.stage.addChild(this.currentScreen)
      console.log(this.currentScreen.viewport)
    })

    this.signals.onViewportPauseDrag.connect(() => {
      this.currentScreen.viewport.plugins.pause('drag')
    })

    this.signals.onViewportResumeDrag.connect(() => {
      this.currentScreen.viewport.plugins.resume('drag')
    })

    this.signals.onFollowViewportToTarget.connect(() => {
      this.currentScreen.viewport.moveCenter(
        this.currentScreen.viewport.width / 2,
        this.currentScreen.viewport.height / 2
      )
    })
  }

  addContainer(container: Container, containerType: ScreensType, index?: number) {
    this[containerType].addContainer(container, index)
  }

  getActiveContainer() {
    return this.currentScreen.activeContainer
  }

  getCurrentScreen() {
    return this.currentScreen
  }

  init() {
    this.map.init(this.game.app)
    this.possession.init(this.game.app)
    this.td.init()
    this.castle.init(this.game.app)

    this.game.app.stage.addChild(this.currentScreen)
  }

  update() {
    this.currentScreen.update()
  }
}
