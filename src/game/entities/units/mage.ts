import { Graphics } from 'pixi.js'
import { BaseEntity } from '../base'

export class MageUnit extends BaseEntity {
  damage: number = 1

  init() {
    const g = new Graphics().rect(0, 0, 50, 50).fill({ color: '#4671D5	' })

    this.addChild(g)
  }
}
