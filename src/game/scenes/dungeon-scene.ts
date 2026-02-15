import { Container } from 'pixi.js'
import { Scene } from '../../engine/core'
import { DungeonManager } from '../managers'

export class DungeonScene extends Scene {
  onLoad() {
    const container = new Container()
    DungeonManager.createField(container, this.engine.app.canvas.width)
    container.position.set(this.engine.app.canvas.width / 2 - container.width / 2, 300)
    this.view.addChild(container)

    DungeonManager.run(this.engine, this.view, container)
  }

  onUnLoad() {
    DungeonManager.stop(this.engine)
  }

  update(dt: number): void {}
}
