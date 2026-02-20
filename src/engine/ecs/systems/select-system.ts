import { FederatedPointerEvent } from 'pixi.js'
import { World } from '../../core'
import { EngineContext } from '../../engine-ctx'
import { SelectableComponent } from '../components'
import { System } from './system'
import { SYSTEM_PRIORITY } from './types'

export class SelectSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  init(ctx: EngineContext) {
    const world = ctx.get<World>(World)

    world.on('entityClicked', ({ entityId, originalEvent }) => {
      if (entityId) {
        this.onEntityClicked(entityId, originalEvent, world)
      }
    })
  }

  onEntityClicked(entityId: number, originalEvent: FederatedPointerEvent, world: World) {
    const e = world.getEntity(entityId)
    if (!e) return

    const selectable = world.getComponent(e, SelectableComponent)!

    if (selectable) {
      selectable.selected = true
    }
  }

  onRemove(ctx: EngineContext): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(SelectableComponent)) {
      const selected = world.getComponent(entity, SelectableComponent)!
      selected.selected = false
    }
  }
}
