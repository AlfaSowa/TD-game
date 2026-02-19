import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { HealthComponent } from '../components'

export class HealthSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(HealthComponent)) {
      const health = world.getComponent(entity, HealthComponent)!
    }
  }
}
