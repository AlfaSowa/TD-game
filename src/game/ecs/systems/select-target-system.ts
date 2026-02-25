import { FederatedPointerEvent } from 'pixi.js'
import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { ActionIntentComponent, SelectedTargetComponent } from '../components'

export class SelectTargetSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  init(ctx: EngineContext) {
    const world = ctx.get<World>(World)

    world.on('selectTarget', ({ entityId, originalEvent }) => {
      if (entityId) {
        this.onEntityClicked(entityId, originalEvent, world)
      }
    })
  }

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(SelectedTargetComponent)) {
      const clickable = world.getComponent(entity, SelectedTargetComponent)!

      if (clickable.bound) continue

      entity.eventMode = 'static'
      entity.cursor = 'pointer'

      // entity.on('pointerup', (event) => {
      //   console.log('Clicked entity:', entity.uid)
      //   console.log(entity)
      // })

      clickable.bound = true
    }
  }

  onEntityClicked(entityId: number, originalEvent: FederatedPointerEvent, world: World) {
    const e = world.getEntity(entityId)
    if (!e) return

    const enemy = world.getComponent(e, SelectedTargetComponent)!

    if (!enemy) return

    const actionIntentEntity = world.getOrCreateSingleton(ActionIntentComponent, new ActionIntentComponent())
    const actionIntent = world.getComponent(actionIntentEntity, ActionIntentComponent)

    for (const entity of world.with(SelectedTargetComponent)) {
      const selectable = world.getComponent(entity, SelectedTargetComponent)!
      selectable.selected = false
      entity.tint = 0xffffff
    }

    const selectable = world.getComponent(e, SelectedTargetComponent)!

    if (selectable && actionIntent) {
      actionIntent.target = e
      selectable.selected = true
      e.tint = 0x00ff00
    }
  }

  onRemove(ctx: EngineContext): void {
    const world = ctx.get<World>(World)

    console.log('8989')

    for (const entity of world.with(SelectedTargetComponent)) {
      const selected = world.getComponent(entity, SelectedTargetComponent)!

      selected.bound = false
      selected.selected = false
      entity.tint = 0xffffff

      entity.eventMode = 'passive'
      entity.removeAllListeners()
    }
  }
}
