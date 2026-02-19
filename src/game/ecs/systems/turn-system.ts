import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SystemPriority } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { TurnComponent } from '../components'

export class TurnSystem implements System {
  priority: SystemPriority = SystemPriority.LOW

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(TurnComponent)) {
      const turnBtnComponent = world.getComponent(entity, TurnComponent)!

      if (turnBtnComponent.btnPressed) {
      }
    }
  }
}
