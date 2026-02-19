import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { DeathTagComponent, HealthComponent, IntervalDamageComponent } from '../components'

export class IntervalDamageSystem implements System {
  priority = SYSTEM_PRIORITY.INTERMEDIATE

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(IntervalDamageComponent)) {
      const intervalDamage = world.getComponent(entity, IntervalDamageComponent)!
      const health = world.getComponent(entity, HealthComponent)!

      intervalDamage.timeLeft -= dt
      intervalDamage.elapsed += dt

      if (intervalDamage.elapsed >= intervalDamage.interval) {
        health.currentHealth = health.currentHealth - intervalDamage.damagePerTick
        intervalDamage.elapsed = 0

        console.log(
          'enemy HP',
          `${health.currentHealth} из ${health.maxHealth}: damage ${intervalDamage.damagePerTick} `
        )
      }

      if (intervalDamage.timeLeft <= 0) {
        world.removeComponent(entity, IntervalDamageComponent)
      }

      if (health.currentHealth <= 0) {
        console.log(entity)
        world.addComponent(entity, new DeathTagComponent())
      }
    }
  }
}
