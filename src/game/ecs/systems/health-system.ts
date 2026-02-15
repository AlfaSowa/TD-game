import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SystemPriority } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { HealthComponent } from '../components'

export class HealthSystem implements System {
  priority: SystemPriority = SystemPriority.LOW

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(HealthComponent)) {
      const health = world.getComponent(entity, HealthComponent)!
    }
  }
}
