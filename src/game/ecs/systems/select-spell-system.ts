import { FederatedPointerEvent } from 'pixi.js'
import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { AbilityComponent, ActionIntentComponent, SelectedAbilityComponent } from '../components'

export class SelectSpellSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  init(ctx: EngineContext) {
    const world = ctx.get<World>(World)

    world.on('selectAbility', ({ entityId, originalEvent }) => {
      if (entityId) {
        this.onEntityClicked(entityId, originalEvent, world)
      }
    })
  }

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(SelectedAbilityComponent)) {
      const clickable = world.getComponent(entity, SelectedAbilityComponent)!

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

    const spell = world.getComponent(e, SelectedAbilityComponent)!

    if (!spell) return

    const actionIntentEntity = world.getOrCreateSingleton(ActionIntentComponent, new ActionIntentComponent())
    const actionIntent = world.getComponent(actionIntentEntity, ActionIntentComponent)

    for (const entity of world.with(SelectedAbilityComponent)) {
      const selectable = world.getComponent(entity, SelectedAbilityComponent)!

      selectable.selected = false
      entity.tint = 0xffffff
    }

    const selectable = world.getComponent(e, SelectedAbilityComponent)!
    const ability = world.getComponent(e, AbilityComponent)

    if (selectable && actionIntent && ability) {
      actionIntent.abilityId = ability.abilityId
      actionIntent.ability = e

      selectable.selected = true
      e.tint = 0x00ff00
    }
  }

  onRemove(ctx: EngineContext): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(SelectedAbilityComponent)) {
      const selected = world.getComponent(entity, SelectedAbilityComponent)!

      selected.bound = false
      selected.selected = false
      entity.tint = 0xffffff

      entity.eventMode = 'passive'
      entity.removeAllListeners()
    }
  }
}
