import { Scene } from '../../engine/core'
import { DungeonManager } from '../managers'

export class DungeonScene extends Scene {
  onLoad() {
    DungeonManager.run(this.engine, this.view)
  }

  onUnLoad() {
    DungeonManager.stop(this.engine)
  }

  update(dt: number): void {}
}
