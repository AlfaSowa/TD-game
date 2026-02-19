import { World } from '../../core'
import { EngineContext } from '../../engine-ctx'
import { SelectableComponent } from '../components'
import { System } from './system'
import { SYSTEM_PRIORITY } from './types'

export class HighlightSystem implements System {
  priority = SYSTEM_PRIORITY.INTERMEDIATE

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(SelectableComponent)) {
      const selected = world.getComponent(entity, SelectableComponent)!

      entity.tint = selected.selected ? 0x00ff00 : 0xffffff
    }
  }
}
