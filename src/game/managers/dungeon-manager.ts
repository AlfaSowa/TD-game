import { Assets, Container } from 'pixi.js'
import { Engine } from '../../engine/core'
import { randomNumber } from '../../utils'
import { EnemyType } from '../configs'
import {
  BattleEndSystem,
  BattleInitSystem,
  BattleSystem,
  DeathSystem,
  IntervalDamageSystem,
  SelectEnemySystem,
  SelectSpellSystem,
  TurnSystem
} from '../ecs/systems'

export type EnemyEntityType = {
  position: number
  texture: string
  type: EnemyType
}

export type BattleConfigType = {
  enemies: EnemyEntityType[]
  field: {
    w: number
    h: number
  }
}

const battleConfig: BattleConfigType = {
  enemies: [
    { position: Math.floor(randomNumber([1, 3])), texture: 'Castle_Blue.png', type: 'mage' },
    { position: Math.floor(randomNumber([4, 8])), texture: 'House_Blue.png', type: 'warrior' },
    { position: Math.floor(randomNumber([9, 15])), texture: 'House_Red.png', type: 'warrior' },
    { position: Math.floor(randomNumber([16, 20])), texture: 'Tree2.png', type: 'mage' },
    { position: Math.floor(randomNumber([20, 25])), texture: 'camp.png', type: 'mage' }
  ],
  field: { h: 5, w: 5 }
}

export type PlayerSpellType = {
  position: number
  texture: string
}

export type PlayerSpellConfigType = {
  spells: PlayerSpellType[]
}

const playerSpellsConfig: PlayerSpellConfigType = {
  spells: [{ position: 0, texture: 'Castle_Blue.png' }]
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
    engine.systems.add(new IntervalDamageSystem())
    engine.systems.add(new DeathSystem())
    engine.systems.add(new TurnSystem())

    engine.systems.add(new SelectEnemySystem())
    engine.systems.get(SelectEnemySystem)?.init?.(engine.engineContext)

    engine.systems.add(new SelectSpellSystem())
    engine.systems.get(SelectSpellSystem)?.init?.(engine.engineContext)

    console.log('app', engine.app)
    console.log('world', engine.world)
    console.log('systems', engine.systems)
  }

  static stop(engine: Engine) {
    engine.systems.remove(BattleInitSystem, engine.engineContext)
    engine.systems.remove(BattleSystem, engine.engineContext)
    engine.systems.remove(BattleEndSystem, engine.engineContext)
    engine.systems.remove(IntervalDamageSystem, engine.engineContext)
    engine.systems.remove(DeathSystem, engine.engineContext)
    engine.systems.remove(TurnSystem, engine.engineContext)

    engine.systems.remove(SelectEnemySystem, engine.engineContext)
    engine.systems.remove(SelectSpellSystem, engine.engineContext)
  }
}
