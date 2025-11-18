import { ScreensSystem } from '../../screens'
import { BaseEntity } from '../base'

export class Cave extends BaseEntity {
  async init() {
    this.clicked(() => {
      this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('cave')
    })
  }
}
