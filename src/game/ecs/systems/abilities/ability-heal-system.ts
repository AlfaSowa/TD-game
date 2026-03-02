import { World } from '../../../../engine/core'
import { System } from '../../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../../engine/ecs/systems/types'
import { EngineContext } from '../../../../engine/engine-ctx'
import { AbilityHealComponent, HealthComponent } from '../../components'

export class AbilityHealSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(AbilityHealComponent, HealthComponent)) {
      const health = world.getComponent(entity, HealthComponent)!
      const heal = world.getComponent(entity, AbilityHealComponent)!

      health.currentHealth =
        health.currentHealth + heal.value >= health.maxHealth ? health.maxHealth : health.currentHealth + heal.value

      console.log('AbilityHealSystem health', health)

      world.removeComponent(entity, AbilityHealComponent)
    }
  }
}
