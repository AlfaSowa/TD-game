import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { DeathTagComponent } from '../components'

export class DeathSystem implements System {
  priority = SYSTEM_PRIORITY.SUPPORT

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
