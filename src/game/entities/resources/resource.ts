import { Game } from '../../game'
import { BaseEntity } from '../base'

type ResourceConstructorType = {
  onUpdate?: (e: Resource) => void
  onRemove?: (e: Resource) => void
  onClick?: (e: Resource) => void
  game: Game
  value?: number
}
export class Resource extends BaseEntity {
  isAnimated: boolean = false
  onUpdate?: (e: Resource) => void
  onRemove?: (e: Resource) => void
  onClick?: (e: Resource) => void
  value: number = 1

  constructor({ game, onUpdate, onRemove, onClick, value }: ResourceConstructorType) {
    super({ game })

    this.onUpdate = onUpdate
    this.onRemove = onRemove
    this.onClick = onClick

    this.value = value || this.value
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
