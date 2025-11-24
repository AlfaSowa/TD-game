import { Graphics } from 'pixi.js'
import { BaseUnit } from './base'

export class FighterUnit extends BaseUnit {
  damage: number = 7
  hp: number = 150

  init() {
    const g = new Graphics().rect(0, 0, 50, 50).fill({ color: '#A61000' })

    this.addChild(g)
  }
}
