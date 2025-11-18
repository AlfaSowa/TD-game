import { ScreensSystem } from '../../screens'
import { BaseEntity } from '../base'

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
