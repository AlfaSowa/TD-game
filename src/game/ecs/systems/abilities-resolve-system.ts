import { World } from '../../../engine/core'
import { Entity } from '../../../engine/ecs/entities'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { abilitiesConfigs } from '../../configs'
import { ActionIntentComponent, DeathTagComponent, HealthComponent } from '../components'

export class AbilitiesResolveSystem implements System {
  priority = SYSTEM_PRIORITY.SUPPORT

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(ActionIntentComponent)) {
      const action = world.getComponent(entity, ActionIntentComponent)
      if (action && action.abilityId && action.target && action.caster) {
        const config = abilitiesConfigs[action.abilityId]

        for (const effect of config.effects) {
          console.log('effect', effect)

          switch (effect.type) {
            case 'damage':
              this.resolveDamage(world, action.target, effect)
              break

            case 'heal':
              this.resolveHeal(world, action.target, effect)
              break

            default:
              console.warn('Unknown effect:', effect.type)
          }
        }

        action.abilityId = undefined
        action.caster = undefined
        action.target = undefined
      }
    }
  }

  resolveDamage(world: World, target: Entity, effect: any) {
    const health = world.getComponent(target, HealthComponent)!

    health.currentHealth -= effect.amount

    if (health.currentHealth <= 0) {
      console.log(target)
      world.addComponent(target, new DeathTagComponent())
    }
    console.log(1124124214)

    console.log('health', health)
  }

  resolveHeal(world: World, target: Entity, effect: any) {
    const health = world.getComponent(target, HealthComponent)!

    health.currentHealth =
      health.currentHealth + effect.amount > health.maxHealth ? health.maxHealth : health.currentHealth + effect.amount

    console.log('health', health)
  }
}
