import { World } from '../../core'
import { EngineContext } from '../../engine-ctx'
import { PositionComponent } from '../components'
import { System } from './system'
import { SystemPriority } from './types'

export class MovementSystem implements System {
  priority: SystemPriority = SystemPriority.MEDIUM

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(PositionComponent)) {
      const position = world.getComponent(entity, PositionComponent)
    }
  }
}
