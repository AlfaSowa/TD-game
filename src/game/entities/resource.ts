import { Graphics } from 'pixi.js'
import { Game } from '../game'
import { BaseEntity } from './base'

type ResourceConstructorType = {
  onUpdate?: (e: Resource) => void
  onRemove?: (e: Resource) => void
  game: Game
}
export class Resource extends BaseEntity {
  isAnimated: boolean = false
  onUpdate?: (e: Resource) => void
  onRemove?: (e: Resource) => void

  constructor({ game, onUpdate, onRemove }: ResourceConstructorType) {
    super({ game })

    this.onUpdate = onUpdate
    this.onRemove = onRemove
  }

  init() {
    const graphics = new Graphics().circle(0, 0, 25).fill({ color: 'brown' })

    graphics.eventMode = 'static'
    graphics.cursor = 'pointer'

    graphics.on('pointerup', () => {
      this.isAnimated = true
    })

    this.addChild(graphics)
  }

  update() {
    if (this.onUpdate) {
      this.onUpdate.call(this, this)
    }
  }

  remove() {
    super.remove()

    if (this.onRemove) {
      this.onRemove.call(this, this)
    }
  }
}
