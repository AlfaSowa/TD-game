import { Game } from '../../game'
import { BaseEntity } from '../base'

type ResourceConstructorType = {
  onUpdate?: (e: Resource) => void
  onRemove?: (e: Resource) => void
  onClick?: (e: Resource) => void
  game: Game
}
export class Resource extends BaseEntity {
  isAnimated: boolean = false
  onUpdate?: (e: Resource) => void
  onRemove?: (e: Resource) => void
  onClick?: (e: Resource) => void

  constructor({ game, onUpdate, onRemove, onClick }: ResourceConstructorType) {
    super({ game })

    this.onUpdate = onUpdate
    this.onRemove = onRemove
    this.onClick = onClick
  }

  clicked() {
    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', () => {
      if (this.onClick) {
        this.onClick.call(this, this)
      }
    })

    return this
  }

  update() {
    if (this.onUpdate) {
      this.onUpdate.call(this, this)
    }
  }

  remove() {
    if (this.onRemove) {
      this.onRemove.call(this, this)
    }

    super.remove()
  }
}
