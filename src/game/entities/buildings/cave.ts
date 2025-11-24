import { ScreensSystem } from '../../screens'
import { BaseBuilding } from './base'

export class Cave extends BaseBuilding {
  init() {
    this.clicked(() => {
      this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('cave')
    })
  }
}
