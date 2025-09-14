import { Container } from 'pixi.js'
import { Game } from '..'
import { CastleScreen, CaveScreen, MapScreen, PossessionScreen, TDScreen } from '../screens'

import { Signal } from 'typed-signals'
import { CaveScreenSystem } from './cave-screen-system'
import { SystemRunner } from './system-runner'
import { System } from './types'

export type ScreensType = 'map' | 'possession' | 'td' | 'castle' | 'cave'

type ScreensObjectType = {
  map: MapScreen
  possession: PossessionScreen
  td: TDScreen
  castle: CastleScreen
  cave: CaveScreen
}
export class ScreensSystem implements System {
  public static SYSTEM_ID = 'screens'

  game!: Game

  screens!: ScreensObjectType

  currentScreen!: MapScreen | PossessionScreen | TDScreen | CaveScreen | CastleScreen
  systems!: SystemRunner

  public signals = {
    onToggleScreen: new Signal<(type: ScreensType) => void>(),
    onViewportPauseDrag: new Signal<() => void>(),
    onViewportResumeDrag: new Signal<() => void>(),
    onFollowViewportToTarget: new Signal<() => void>()
  }

  constructor() {
    this.signals.onToggleScreen.connect((type) => {
      if (this.currentScreen === this.screens.cave) {
        console.log('onToggleScreen from cave')
        this.game.systems.get(CaveScreenSystem).signals.onResetMainContent.emit()
      }

      this.currentScreen.removeFromParent()
      this.currentScreen = this.screens[type]
      this.game.app.stage.addChild(this.currentScreen)

      this.currentScreen.onLoad()
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
    this.screens[containerType].addContainer(container, index)
  }

  removeContainer(containerType: ScreensType, id: number) {
    for (const element of this.screens[containerType].activeContainer.children) {
      if (element.uid === id) {
        element.removeFromParent()
        element.destroy()
      }
    }
  }

  getActiveContainer() {
    return this.currentScreen.activeContainer
  }

  getCurrentScreen() {
    return this.currentScreen
  }

  getScreen<K extends keyof ScreensObjectType>(screenType: K): ScreensObjectType[K] {
    return this.screens[screenType]
  }

  init() {
    this.screens = {
      map: new MapScreen({ game: this.game }),
      possession: new PossessionScreen({ game: this.game }),
      td: new TDScreen({ game: this.game }),
      castle: new CastleScreen({ game: this.game }),
      cave: new CaveScreen({ game: this.game })
    }

    //!DEV
    this.currentScreen = this.screens.cave

    this.screens.map.init(this.game.app)
    this.screens.possession.init(this.game.app)
    this.screens.td.init(this.game.app)
    this.screens.castle.init(this.game.app)
    this.screens.cave.init(this.game.app)

    this.game.app.stage.addChild(this.currentScreen)

    this.currentScreen.onLoad()
  }

  update() {
    this.currentScreen.update()
  }
}
