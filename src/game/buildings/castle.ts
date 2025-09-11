import { BaseEntity } from '../base'
import { ScreensSystem } from '../systems'

export class Castle extends BaseEntity {
  async init() {
    this.clicked(() => {
      this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('castle')
    })
  }

  updateResources() {
    console.log('updateResources')
  }
}
