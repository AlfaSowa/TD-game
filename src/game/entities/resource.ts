import { Graphics } from 'pixi.js'
import { Game } from '../game'
import { BaseEntity } from './base'

export class Resource extends BaseEntity {
  isAnimated: boolean = false
  onUpdate?: (e: Resource) => void

  constructor({ game, onUpdate }: { game: Game; onUpdate?: (e: Resource) => void }) {
    super({ game })

    this.onUpdate = onUpdate
  }

  init() {
    const graphics = new Graphics().circle(0, 0, 35).fill({ color: 'brown' })

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
}
