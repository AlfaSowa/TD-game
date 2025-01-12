import { Graphics } from 'pixi.js'
import { BaseEntity } from './base'

export class Resource extends BaseEntity {
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
