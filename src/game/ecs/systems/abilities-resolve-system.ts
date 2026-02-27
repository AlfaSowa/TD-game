import { World } from '../../../engine/core'
import { Entity } from '../../../engine/ecs/entities'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { ActiveAbilityTagComponent, DeathTagComponent, HealthComponent } from '../components'

export class AbilitiesResolveSystem implements System {
  priority = SYSTEM_PRIORITY.SUPPORT

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    //TODO переделать делать проход по всем entity, которые имеют тег ActiveAbilityTagComponent и уберать тег когда произошел резолв эффекта.
    //TODO так как эффект может длиться несколько ходов нужно это продумать
    //TODO выполнять резолв эффектов по очереди чтобы добавиь визуализацию.
    //TODO пересмотреть нужен ли компонент ActionIntentComponent
    for (const entity of world.with(ActiveAbilityTagComponent)) {
      // const action = world.getComponent(entity, ActionIntentComponent)
      // if (action && action.abilityId && action.target && action.caster) {
      //   const config = abilitiesConfigs[action.abilityId]
      //   for (const effect of config.effects) {
      //     switch (effect.type) {
      //       case 'damage':
      //         this.resolveDamage(world, action.target, effect)
      //         break
      //       case 'heal':
      //         this.resolveHeal(world, action.target, effect)
      //         break
      //       case 'interval':
      //         this.resolveInterval(world, action.target, effect)
      //         break
      //       default:
      //         console.warn('Unknown effect:', effect.type)
      //     }
      //   }
      //   action.abilityId = undefined
      //   action.caster = undefined
      //   action.target = undefined
      // }
    }
  }

  resolveDamage(world: World, target: Entity, effect: any) {
    const health = world.getComponent(target, HealthComponent)!

    health.currentHealth -= effect.amount

    if (health.currentHealth <= 0) {
      world.addComponent(target, new DeathTagComponent())
    }
  }

  resolveHeal(world: World, target: Entity, effect: any) {
    const health = world.getComponent(target, HealthComponent)!

    health.currentHealth =
      health.currentHealth + effect.amount > health.maxHealth ? health.maxHealth : health.currentHealth + effect.amount
  }

  resolveInterval(world: World, target: Entity, effect: any) {
    const health = world.getComponent(target, HealthComponent)!

    health.currentHealth -= effect.amount

    if (health.currentHealth <= 0) {
      world.addComponent(target, new DeathTagComponent())
    }
  }
}
