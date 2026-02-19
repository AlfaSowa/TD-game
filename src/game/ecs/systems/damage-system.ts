import { World } from '../../../engine/core'
import { System } from '../../../engine/ecs/systems'
import { SystemPriority } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { DamageComponent, DeathTagComponent, HealthComponent, TurnComponent } from '../components'

export class DamageSystem implements System {
  priority: SystemPriority = SystemPriority.HIGH

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(TurnComponent)) {
      const turnComponent = world.getComponent(entity, TurnComponent)!

      if (turnComponent.btnPressed && turnComponent.attacker && turnComponent.defender) {
        const attackerDamageComponent = world.getComponent(turnComponent.attacker, DamageComponent)!
        const defenderHealthComponent = world.getComponent(turnComponent.defender, HealthComponent)!

        defenderHealthComponent.currentHealth = defenderHealthComponent.currentHealth - attackerDamageComponent.damage

        console.log(
          'enemy HP',
          `${defenderHealthComponent.currentHealth} из ${defenderHealthComponent.maxHealth}: damage ${attackerDamageComponent.damage} `
        )

        if (defenderHealthComponent.currentHealth <= 0) {
          world.addComponent(turnComponent.defender, new DeathTagComponent())
        }

        turnComponent.btnPressed = false
      }
    }
  }
}
