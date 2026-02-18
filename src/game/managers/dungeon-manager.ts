import { Assets, Container } from 'pixi.js'
import { Engine } from '../../engine/core'
import { EnemyType } from '../configs'
import { BattleEndSystem, BattleInitSystem, BattleSystem, DamageSystem } from '../ecs/systems'

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
    { position: 3, texture: 'Castle_Blue.png', type: 'mage' },
    { position: 1, texture: 'House_Blue.png', type: 'warrior' },
    { position: 5, texture: 'House_Red.png', type: 'warrior' },
    { position: 20, texture: 'Tree2.png', type: 'mage' },
    { position: 11, texture: 'camp.png', type: 'mage' }
  ],
  field: { h: 5, w: 5 }
}
export class DungeonManager {
  static async initAssets() {
    return await Assets.loadBundle(['default'])
  }

  static async run(engine: Engine, view: Container) {
    const texture = await this.initAssets()

    engine.systems.add(new BattleInitSystem(view, texture, battleConfig))
    engine.systems.add(new BattleSystem())
    engine.systems.add(new BattleEndSystem())
    engine.systems.add(new DamageSystem())

    console.log('app', engine.app)
    console.log('world', engine.world)
  }

  static stop(engine: Engine) {
    engine.systems.remove(BattleInitSystem, engine.engineContext)
    engine.systems.remove(BattleSystem, engine.engineContext)
    engine.systems.remove(BattleEndSystem, engine.engineContext)
    engine.systems.remove(DamageSystem, engine.engineContext)
  }
}
