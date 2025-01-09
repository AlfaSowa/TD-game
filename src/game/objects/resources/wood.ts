import { Graphics } from 'pixi.js'
import { BaseResource } from './base'

export class Wood extends BaseResource {
  init() {
    const graphics = new Graphics().circle(0, 0, 35).fill({ color: 'brown' })

    graphics.eventMode = 'static'
    graphics.cursor = 'pointer'

    graphics.on('pointerup', () => {
      this.remove()
    })

    this.addChild(graphics)
  }
}
