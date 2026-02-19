import { Application } from 'pixi.js'
import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { BattleComponent, BattlePhase } from '../components/battle-component'

export class BattleEndSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)
    const app = ctx.get<Application>(Application)

    const battleEntity = world.getOrCreateSingleton(BattleComponent, new BattleComponent())
    const battle = world.getComponent(battleEntity, BattleComponent)

    if (battle?.phase === BattlePhase.END) {
      console.log('Game END')
    }
  }
}
