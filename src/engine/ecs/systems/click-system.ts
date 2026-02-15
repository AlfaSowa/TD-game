import { World } from '../../core'
import { EngineContext } from '../../engine-ctx'
import { ClickableComponent } from '../components'
import { System } from './system'
import { SystemPriority } from './types'

export class ClickSystem implements System {
  priority: SystemPriority = SystemPriority.LOW

  bound = new WeakSet()

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(ClickableComponent)) {
      const clickable = world.getComponent(entity, ClickableComponent)!

      if (clickable.bound) continue

      entity.eventMode = 'static'
      entity.cursor = 'pointer'

      entity.on('pointerup', (event) => {
        console.log('Clicked entity:', entity.uid)
      })

      clickable.bound = true
    }
  }

  onRemove(ctx: EngineContext): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(ClickableComponent)) {
      const clickable = world.getComponent(entity, ClickableComponent)!
      clickable.bound = false
      entity.removeAllListeners()
    }
  }
}
