import { Container, Graphics } from 'pixi.js'
import { BaseEntity } from '../../entities'

export class Cell extends Container {
  isSelected: boolean = false

  owner!: BaseEntity

  updateGraphics(size: number) {
    const g = new Graphics().rect(0, 0, size, size).fill({ color: '#f1f1f1' }).stroke(0x00ff00)
    this.addChild(g)
  }

  clicked(callback: (e: Cell, f: BaseEntity) => void) {
    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', () => {
      callback.call(this, this, this.owner)
    })

    return this
  }

  select(uid: number) {
    if (uid === this.uid) {
      if (!this.isSelected) {
        this.isSelected = true
        for (const element of this.children) {
          if (element instanceof Graphics) {
            const size = element.width - 1
            element.clear()
            element.rect(0, 0, size, size).fill({ color: '#FF8073' }).stroke(0x00ff00)
          }
        }
      }

      return this
    } else {
      if (this.isSelected) {
        this.isSelected = false
        for (const element of this.children) {
          if (element instanceof Graphics) {
            const size = element.width - 1
            element.clear()
            element.rect(0, 0, size, size).fill({ color: '#f1f1f1' }).stroke(0x00ff00)
          }
        }
      }
    }

    return null
  }
}
