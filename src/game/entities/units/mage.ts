import { Graphics } from 'pixi.js'
import { BaseUnit } from './base'

export class MageUnit extends BaseUnit {
  damage: number = 5
  hp: number = 100

  init() {
    const g = new Graphics().rect(0, 0, 50, 50).fill({ color: '#4671D5	' })

    this.addChild(g)
  }
}
