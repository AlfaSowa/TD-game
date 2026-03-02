import { Assets, Container } from 'pixi.js'
import { Engine } from '../../engine/core'
import { randomNumber } from '../../utils'
import { AbilitiesIds, EnemyType } from '../configs'
import {
  AbilitiesResolveSystem,
  BattleEndSystem,
  BattleInitSystem,
  BattleSystem,
  DeathSystem,
  SelectSpellSystem,
  SelectTargetSystem
} from '../ecs/systems'
import { AbilityDamageSystem, AbilityHealSystem, AbilityStatusSystem } from '../ecs/systems/abilities'

export type EnemyEntityType = {
  position: number
  texture: string
  type: EnemyType
  frames: number
}

export type BattleConfigType = {
  enemies: EnemyEntityType[]
  field: {
    w: number
    h: number
  }
}

const WARRIOR_ENEMY = 'Warrior_Idle.png'
const ARCHER_ENEMY = 'Archer_Idle.png'

const battleConfig: BattleConfigType = {
  enemies: [
    { position: Math.floor(randomNumber([1, 3])), texture: ARCHER_ENEMY, type: 'archer', frames: 6 },
    { position: Math.floor(randomNumber([4, 8])), texture: WARRIOR_ENEMY, type: 'warrior', frames: 8 },
    { position: Math.floor(randomNumber([9, 15])), texture: WARRIOR_ENEMY, type: 'warrior', frames: 8 },
    { position: Math.floor(randomNumber([16, 20])), texture: ARCHER_ENEMY, type: 'archer', frames: 6 },
    { position: Math.floor(randomNumber([20, 25])), texture: ARCHER_ENEMY, type: 'archer', frames: 6 }
  ],
  field: { h: 5, w: 5 }
}

export type PlayerSpellType = {
  position: number
  texture: string
  id: AbilitiesIds
}

export type PlayerSpellConfigType = {
  spells: PlayerSpellType[]
}

const playerSpellsConfig: PlayerSpellConfigType = {
  spells: [
    { position: 0, texture: 'House_Red.png', id: 'fireball' },
    { position: 1, texture: 'House_Blue.png', id: 'heal' },
    { position: 2, texture: 'Castle_Blue.png', id: 'freez' },
    { position: 3, texture: 'дом.png', id: 'burn' }
  ]
}

export class DungeonManager {
  static async initAssets() {
    return await Assets.loadBundle(['default'])
  }

  static async run(engine: Engine, view: Container) {
    const texture = await this.initAssets()

    engine.systems.add(new BattleInitSystem(view, texture, battleConfig, playerSpellsConfig))
    engine.systems.add(new BattleSystem())
    engine.systems.add(new BattleEndSystem())
    engine.systems.add(new DeathSystem())

    engine.systems.add(new AbilitiesResolveSystem())

    engine.systems.add(new AbilityHealSystem())
    engine.systems.add(new AbilityStatusSystem())
    engine.systems.add(new AbilityDamageSystem())

    engine.systems.add(new SelectTargetSystem())
    engine.systems.add(new SelectSpellSystem())

    console.log('app', engine.app)
    console.log('world', engine.world)
    console.log('systems', engine.systems)
  }

  static stop(engine: Engine) {
    engine.systems.remove(BattleInitSystem)
    engine.systems.remove(BattleSystem)
    engine.systems.remove(BattleEndSystem)
    engine.systems.remove(DeathSystem)
    engine.systems.remove(SelectTargetSystem)
    engine.systems.remove(SelectSpellSystem)

    engine.systems.remove(AbilitiesResolveSystem)

    engine.systems.remove(AbilityHealSystem)
    engine.systems.remove(AbilityStatusSystem)
    engine.systems.remove(AbilityDamageSystem)
  }
}
