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
  CombatStateComponent,
  EffectTagComponent
} from '../components'

type QueueElement = { target: Entity; effect: EffectTagComponent }
export class AbilitiesResolveSystem implements System {
  priority = SYSTEM_PRIORITY.SUPPORT

  roundTimer: number = 100
  timer: number = 0

  queue: QueueElement[] = []
  preparingQueue: QueueElement[] = []

  effectsStatuses: Record<StatusType, (world: World, target: Entity, effect: Effect) => QueueElement> = {
    damage: (world, target, effect) => this.executeDamage(world, target, effect),
    status: (world, target, effect) => this.executeStatus(world, target, effect),
    heal: (world, target, effect) => this.executeHeal(world, target, effect)
  }

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)
    const combatEntity = world.getOrCreateSingleton(CombatStateComponent, new CombatStateComponent())
    const combat = world.getComponent(combatEntity, CombatStateComponent)

    if (combat?.phase === COMBAT_STATE.PREPARING) {
      this.queue = this.preparingQueue
      this.preparingQueue = []

      console.log('this.queue', this.queue)
      console.log('this.preparingQueue', this.preparingQueue)

      combat.phase = COMBAT_STATE.SELECTED
    }

    if (combat?.phase === COMBAT_STATE.EFFECTS_INIT) {
      const actionIntentEntity = world.getOrCreateSingleton(ActionIntentComponent, new ActionIntentComponent())
      const actionIntent = world.getComponent(actionIntentEntity, ActionIntentComponent)

      if (actionIntent?.ability && actionIntent?.abilityId && actionIntent?.target) {
        const config = abilitiesConfigs[actionIntent.abilityId]

        for (const effect of config.effects) {
          const element = this.effectsStatuses?.[effect.status]?.(world, actionIntent?.target, effect)
          this.queue.push(element)
        }

        actionIntent.ability = undefined
        actionIntent.abilityId = undefined
        actionIntent.target = undefined
        actionIntent.caster = undefined
      }

      combat.phase = COMBAT_STATE.RESOLVING
    }

    if (combat?.phase === COMBAT_STATE.RESOLVING) {
      this.timer += dt

      if (this.timer >= this.roundTimer) {
        this.timer = 0
        const queueElement = this.queue.shift()

        if (queueElement) {
          const target = world.getEntity(queueElement.target.uid)
          if (!target) return

          world.addComponent(queueElement.target, queueElement.effect)

          console.log('queueElement', queueElement)

          if (queueElement.effect instanceof AbilityStatusComponent) {
            this.preparingQueue.push(queueElement)
          }
        }
      }

      if (this.queue.length <= 0) {
        combat.phase = COMBAT_STATE.END_TURN
      }
    }
  }

  executeDamage(world: World, target: Entity, effect: Effect) {
    return { target: target, effect: new AbilityDamageComponent(effect) }
  }

  executeHeal(world: World, target: Entity, effect: Effect) {
    return { target: target, effect: new AbilityHealComponent(effect) }
  }

  executeStatus(world: World, target: Entity, effect: Effect) {
    return { target: target, effect: new AbilityStatusComponent(effect) }
  }
}
