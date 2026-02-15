import { Application } from 'pixi.js'
import { Engine, Scene } from '../../engine/core'
import { UiBox } from '../../engine/ui'
import { UiInterfaces } from '../ui'

export class MainMenuScene extends Scene {
  uiBox!: UiBox

  init(app: Application, engine: Engine, isViewport?: boolean): void {
    super.init(app, engine, isViewport)

    this.uiBox = UiInterfaces.crateMainMenuInteface(engine)
  }

  onLoad() {
    this.engine.uiManager.load(this.uiBox)
  }

  onUnLoad() {
    this.engine.uiManager.removeFromStage(this.uiBox)
  }
}
