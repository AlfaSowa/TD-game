import { BaseSpell, BaseUnit } from '../entities'
import { Game } from '../game'
import { Player } from '../player'
import { System } from './types'

export class InteractionSystem implements System {
  public static SYSTEM_ID = 'interaction-system'

  game!: Game

  interaction<A extends BaseSpell, B extends BaseUnit | Player>(tA: A, tB: B) {
    tB.hp = tB.hp - tA.damage
    console.log('tB.hp', tB.hp)
  }
}
