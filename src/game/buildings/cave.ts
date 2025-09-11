import { BaseEntity } from '../base'
import { ScreensSystem } from '../systems'

export class Cave extends BaseEntity {
  async init() {
    this.clicked(() => {
      this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('cave')
    })
  }
}
