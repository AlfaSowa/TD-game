import { Graphics } from 'pixi.js'
import { BaseEntity } from '../base'

export class FighterUnit extends BaseEntity {
  damage: number = 5

  init() {
    const g = new Graphics().rect(0, 0, 50, 50).fill({ color: '#A61000' })

    this.addChild(g)
  }
}
