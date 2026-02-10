import { Graphics } from 'pixi.js'
import { BaseSpell, SpellType } from './base'

export class MeleeAttack extends BaseSpell {
  damage = 10

  type = SpellType.MELEE

  init() {
    const g = new Graphics().rect(0, 0, 20, 20).fill({ color: '#FF0000' })

    this.addChild(g)
  }
}
