import { Graphics } from 'pixi.js'
import { BaseSpell } from './base'

export class MeleeAttack extends BaseSpell {
  damage: number = 1

  init() {
    const g = new Graphics().rect(0, 0, 20, 20).fill({ color: '#FF0000' })

    this.addChild(g)
  }
}
