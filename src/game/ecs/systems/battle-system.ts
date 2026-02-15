import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SystemPriority } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { EnemyComponent, HealthComponent } from '../components'
import { BattleComponent, BattlePhase } from '../components/battle-component'

export class BattleSystem implements System {
  priority: SystemPriority = SystemPriority.LOW

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    const battleEntity = world.getOrCreateSingleton(BattleComponent, new BattleComponent())
    const battle = world.getComponent(battleEntity, BattleComponent)

    if (battle?.phase === BattlePhase.GAME_START) {
      for (const entity of world.with(HealthComponent, EnemyComponent)) {
        const health = world.getComponent(entity, HealthComponent)!
        const enemy = world.getComponent(entity, EnemyComponent)!

        if (enemy.selected) {
          console.log(enemy)
        }
      }
    }
  }

  onRemove(ctx: EngineContext): void {
    const world = ctx.get<World>(World)

    const battleEntity = world.getOrCreateSingleton(BattleComponent, new BattleComponent())
    const battle = world.getComponent(battleEntity, BattleComponent)

    if (battle) {
      battle.phase = BattlePhase.INIT
    }

    for (const entity of world.with(HealthComponent)) {
      world.destroyEntity(entity)
      entity.removeAllListeners()
      entity.removeFromParent()
      entity.destroy()
    }
  }
}
