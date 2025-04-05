import { BaseEntity, BaseEntityConstructor } from '../base'

interface ResourceConstructorType extends BaseEntityConstructor {
  onUpdate?: (e: Resource) => void
  onRemove?: (e: Resource) => void
  value?: number
}
export class Resource extends BaseEntity {
  isAnimated: boolean = false
  onUpdate?: (e: Resource) => void
  onRemove?: (e: Resource) => void
  value: number = 1

  constructor({ onUpdate, onRemove, value, ...base }: ResourceConstructorType) {
    super(base)

    this.onUpdate = onUpdate
    this.onRemove = onRemove

    this.value = value || this.value
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
