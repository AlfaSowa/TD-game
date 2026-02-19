import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SystemPriority } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { DeathTagComponent } from '../components'

export class DeathSystem implements System {
  priority: SystemPriority = SystemPriority.HIGH

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(DeathTagComponent)) {
      entity.removeAllListeners()
      entity.removeFromParent()
      entity.destroy()

      world.destroyEntity(entity)
    }
  }
}
