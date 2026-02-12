import { Graphics } from 'pixi.js'
import { Vector2 } from '../../utils'

export class UiSlot extends Graphics {
  constructor(width: number, height: number, position?: Vector2) {
    super()

    this.rect(0, 0, width, height).fill({ color: '#f1f1f1' })
  }

  clicked(callback: (e: UiSlot) => void) {
    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', () => {
      callback.call(this, this)
    })

    return this
  }
}
