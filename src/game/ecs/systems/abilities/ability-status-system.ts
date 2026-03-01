import { World } from '../../../../engine/core'
import { System } from '../../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../../engine/ecs/systems/types'
import { EngineContext } from '../../../../engine/engine-ctx'
import { AbilityStatusComponent, HealthComponent } from '../../components'

export class AbilityStatusSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(AbilityStatusComponent, HealthComponent)) {
      const health = world.getComponent(entity, HealthComponent)!
      const status = world.getComponent(entity, AbilityStatusComponent)!

      world.removeComponent(entity, AbilityStatusComponent)
    }
  }
}
