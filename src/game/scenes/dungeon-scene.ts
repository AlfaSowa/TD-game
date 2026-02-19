import { Application } from 'pixi.js'
import { Engine, Scene } from '../../engine/core'
import { UiBox } from '../../engine/ui'
import { DungeonManager } from '../managers'
import { UiInterfaces } from '../ui'

export class DungeonScene extends Scene {
  uiBox!: UiBox

  init(app: Application, engine: Engine, isViewport?: boolean): void {
    super.init(app, engine, isViewport)

    this.uiBox = UiInterfaces.createTurnStartBtn(engine)
  }

  onLoad() {
    this.engine.uiManager.load(this.uiBox)
    DungeonManager.run(this.engine, this.view)
  }

  onUnLoad() {
    this.engine.uiManager.removeFromStage(this.uiBox)
    DungeonManager.stop(this.engine)
  }
}
