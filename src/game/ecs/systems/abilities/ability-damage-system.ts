import { World } from '../../../../engine/core'
import { System } from '../../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../../engine/ecs/systems/types'
import { EngineContext } from '../../../../engine/engine-ctx'
import { AbilityDamageComponent, DeathTagComponent, HealthComponent } from '../../components'

export class AbilityDamageSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(AbilityDamageComponent, HealthComponent)) {
      const health = world.getComponent(entity, HealthComponent)!
      const damage = world.getComponent(entity, AbilityDamageComponent)!

      health.currentHealth -= damage.value

      if (health.currentHealth < 0) {
        world.addComponent(entity, new DeathTagComponent())
      }

      world.removeComponent(entity, AbilityDamageComponent)
    }
  }
}
