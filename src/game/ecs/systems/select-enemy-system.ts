import { FederatedPointerEvent } from 'pixi.js'
import { World } from '../../../engine/core'
import { SelectableComponent } from '../../../engine/ecs/components'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { EnemyComponent } from '../components'

export class SelectEnemySystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  init(ctx: EngineContext) {
    const world = ctx.get<World>(World)

    world.on('enemyClicked', ({ entityId, originalEvent }) => {
      if (entityId) {
        this.onEntityClicked(entityId, originalEvent, world)
      }
    })
  }

  onEntityClicked(entityId: number, originalEvent: FederatedPointerEvent, world: World) {
    const e = world.getEntity(entityId)
    if (!e) return

    const enemy = world.getComponent(e, EnemyComponent)!

    if (!enemy) return

    for (const entity of world.with(EnemyComponent, SelectableComponent)) {
      const selectable = world.getComponent(entity, SelectableComponent)!
      selectable.selected = false
    }

    const selectable = world.getComponent(e, SelectableComponent)!

    if (selectable) {
      selectable.selected = true
    }
  }

  onRemove(ctx: EngineContext): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(EnemyComponent, SelectableComponent)) {
      const selected = world.getComponent(entity, SelectableComponent)!
      selected.selected = false
    }
  }
}
