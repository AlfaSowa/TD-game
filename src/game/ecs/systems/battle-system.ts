import { World } from '../../../engine/core'
import { System, SystemRunner } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import {
  ActionIntentComponent,
  BATTLE_PHASE,
  BattleComponent,
  COMBAT_STATE,
  CombatStateComponent,
  HealthComponent,
  PlayerTagComponent,
  SelectedAbilityComponent,
  SelectedTargetComponent,
  TurnActionBattleComponent
} from '../components'

export class BattleSystem implements System {
  priority = SYSTEM_PRIORITY.INTERMEDIATE

  roundTimer: number = 100
  timer: number = 0

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)
    const systems = ctx.get<SystemRunner>(SystemRunner)

    const battleEntity = world.getOrCreateSingleton(BattleComponent, new BattleComponent())
    const battle = world.getComponent(battleEntity, BattleComponent)

    const combatEntity = world.getOrCreateSingleton(CombatStateComponent, new CombatStateComponent())
    const combat = world.getComponent(combatEntity, CombatStateComponent)

    const actionBtnEntity = world.getOrCreateSingleton(TurnActionBattleComponent, new TurnActionBattleComponent())
    const actionBtn = world.getComponent(actionBtnEntity, TurnActionBattleComponent)

    const actionIntentEntity = world.getOrCreateSingleton(ActionIntentComponent, new ActionIntentComponent())
    const actionIntent = world.getComponent(actionIntentEntity, ActionIntentComponent)

    const player = world.getOrCreateSingleton(PlayerTagComponent, new PlayerTagComponent())

    if (battle && combat && actionBtn) {
      if (battle.phase === BATTLE_PHASE.GAME_START) {
        if (combat.phase === COMBAT_STATE.INIT) {
          console.log('INIT')
          combat.phase = COMBAT_STATE.PREPARING
        }

        if (combat.phase === COMBAT_STATE.PREPARING) {
          console.log('PREPARING')

          for (const entity of world.with(SelectedTargetComponent)) {
            entity.eventMode = 'static'
          }

          for (const entity of world.with(SelectedAbilityComponent)) {
            entity.eventMode = 'static'
          }
        }

        if (combat.phase === COMBAT_STATE.SELECTED) {
          console.log('SELECTED')

          if (actionBtn.btnPressed && actionIntent) {
            for (const entity of world.with(SelectedTargetComponent)) {
              const selected = world.getComponent(entity, SelectedTargetComponent)!

              selected.bound = false
              selected.selected = false
              entity.eventMode = 'passive'
            }

            for (const entity of world.with(SelectedAbilityComponent)) {
              const selected = world.getComponent(entity, SelectedAbilityComponent)!

              selected.bound = false
              selected.selected = false
              entity.eventMode = 'passive'
            }

            combat.phase = COMBAT_STATE.EFFECTS_INIT

            actionIntent.caster = player

            actionBtn.btnPressed = false
          }
        }

        if (combat.phase === COMBAT_STATE.EFFECTS_INIT) {
          console.log('EFFECTS_INIT')
        }

        if (combat.phase === COMBAT_STATE.RESOLVING) {
          console.log('RESOLVING')
        }

        if (combat.phase === COMBAT_STATE.END_TURN) {
          console.log('END_TURN')

          console.log('world', world)
          console.log('systems', systems)

          combat.phase = COMBAT_STATE.INIT
        }
      }
    }
  }

  onRemove(ctx: EngineContext): void {
    const world = ctx.get<World>(World)

    const battleEntity = world.getOrCreateSingleton(BattleComponent, new BattleComponent())
    const battle = world.getComponent(battleEntity, BattleComponent)

    const combatEntity = world.getOrCreateSingleton(CombatStateComponent, new CombatStateComponent())
    const combat = world.getComponent(combatEntity, CombatStateComponent)

    if (battle && combat) {
      battle.phase = BATTLE_PHASE.INIT
      combat.phase = COMBAT_STATE.INIT
    }

    for (const entity of world.with(HealthComponent)) {
      world.destroyEntity(entity)
    }
  }
}
