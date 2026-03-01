import { World } from '../../../engine/core'
import { Entity } from '../../../engine/ecs/entities'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { abilitiesConfigs, Effect, StatusType } from '../../configs'
import {
  AbilityDamageComponent,
  AbilityHealComponent,
  AbilityStatusComponent,
  ActionIntentComponent,
  COMBAT_STATE,
  CombatStateComponent
} from '../components'

export class AbilitiesResolveSystem implements System {
  priority = SYSTEM_PRIORITY.SUPPORT

  effectsStatuses: Record<StatusType, (world: World, target: Entity, effect: Effect) => void> = {
    damage: (world, target, effect) => this.executeDamage(world, target, effect),
    status: (world, target, effect) => this.executeStatus(world, target, effect),
    heal: (world, target, effect) => this.executeHeal(world, target, effect)
  }

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)
    const combatEntity = world.getOrCreateSingleton(CombatStateComponent, new CombatStateComponent())
    const combat = world.getComponent(combatEntity, CombatStateComponent)

    if (combat?.phase === COMBAT_STATE.EFFECTS_INIT) {
      const actionIntentEntity = world.getOrCreateSingleton(ActionIntentComponent, new ActionIntentComponent())
      const actionIntent = world.getComponent(actionIntentEntity, ActionIntentComponent)

      if (actionIntent?.ability && actionIntent?.abilityId && actionIntent?.target) {
        const config = abilitiesConfigs[actionIntent.abilityId]

        for (const effect of config.effects) {
          this.effectsStatuses?.[effect.status]?.(world, actionIntent?.target, effect)
        }

        actionIntent.ability = undefined
        actionIntent.abilityId = undefined
        actionIntent.target = undefined
        actionIntent.caster = undefined
      }

      combat.phase = COMBAT_STATE.RESOLVING
    }
  }

  executeDamage(world: World, target: Entity, effect: Effect) {
    world.addComponent(target, new AbilityDamageComponent(effect))
  }

  executeHeal(world: World, target: Entity, effect: Effect) {
    world.addComponent(target, new AbilityHealComponent(effect))
  }

  executeStatus(world: World, target: Entity, effect: Effect) {
    world.addComponent(target, new AbilityStatusComponent(effect))
  }
}
