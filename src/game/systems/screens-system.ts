import { Container } from 'pixi.js'
import { Game } from '..'
import { MapScreen, PossessionScreen, TDScreen } from '../screens'

import { Signal } from 'typed-signals'
import { SystemRunner } from './system-runner'
import { System } from './types'

export class ScreensSystem implements System {
  public static SYSTEM_ID = 'screens'

  game!: Game

  map!: MapScreen
  possession!: PossessionScreen
  td!: TDScreen

  currentScreen!: MapScreen | PossessionScreen | TDScreen
  systems!: SystemRunner

  public signals = {
    onToggleScreen: new Signal<(type: 'map' | 'possession' | 'td') => void>(),
    onViewportPauseDrag: new Signal<() => void>(),
    onViewportResumeDrag: new Signal<() => void>(),
    onFollowViewportToTarget: new Signal<() => void>()
  }

  constructor() {
    this.map = new MapScreen()
    this.possession = new PossessionScreen()
    this.td = new TDScreen()
    this.currentScreen = this.map

    this.signals.onToggleScreen.connect((type) => {
      this.currentScreen.removeFromParent()
      this.currentScreen = this[type]
      this.game.app.stage.addChild(this.currentScreen)
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

  addContainer(container: Container, containerType: 'map' | 'possession' | 'td', index?: number) {
    this[containerType].addContainer(container, index)
  }

  getActiveContainer() {
    return this.currentScreen.activeContainer
  }

  init() {
    this.map.init(this.game.app)
    this.possession.init(this.game.app)
    this.td.init()

    this.game.app.stage.addChild(this.currentScreen)
  }

  update() {
    this.currentScreen.update()
  }
}
