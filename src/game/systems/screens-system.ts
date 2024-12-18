import { Container } from 'pixi.js'
import { Game } from '..'
import { MapScreen, PossessionScreen, TDScreen } from '../screens'
import { SystemRunner } from '../system-runner'

import { Signal } from 'typed-signals'
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
    onToggleScreen: new Signal<(type: 'map' | 'possession' | 'td') => void>()
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
  }

  addContainer(container: Container, containerType: 'map' | 'possession' | 'td') {
    this[containerType].addContainer(container)
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
