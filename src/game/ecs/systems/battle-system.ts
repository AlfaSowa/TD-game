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
  TurnActionBattleComponent
} from '../components'
import { AbilitiesResolveSystem } from './abilities-resolve-system'
import { SelectSpellSystem } from './select-spell-system'
import { SelectTargetSystem } from './select-target-system'

export class BattleSystem implements System {
  priority = SYSTEM_PRIORITY.INTERMEDIATE

  roundTimer: number = 200
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
          combat.phase = COMBAT_STATE.IDLE

          systems.add(new SelectTargetSystem())
          systems.add(new SelectSpellSystem())
        }

        if (combat.phase === COMBAT_STATE.IDLE) {
          console.log('IDLE')
          this.timer += dt

          if (this.timer >= this.roundTimer) {
            this.timer = 0
            combat.phase = COMBAT_STATE.SELECTED
          }
        }

        if (combat.phase === COMBAT_STATE.SELECTED) {
          console.log('SELECTED')

          if (actionBtn.btnPressed && actionIntent) {
            combat.phase = COMBAT_STATE.RESOLVING

            actionIntent.caster = player

            systems.remove(SelectTargetSystem)
            systems.remove(SelectSpellSystem)

            console.log('actionIntent', actionIntent)

            actionBtn.btnPressed = false
          }
        }

        if (combat.phase === COMBAT_STATE.RESOLVING) {
          console.log('RESOLVING')
          systems.add(new AbilitiesResolveSystem())

          this.timer += dt

          if (this.timer >= this.roundTimer) {
            this.timer = 0
            combat.phase = COMBAT_STATE.END_TURN
          }
        }

        if (combat.phase === COMBAT_STATE.END_TURN) {
          console.log('END_TURN')
          systems.remove(AbilitiesResolveSystem)

          console.log('world', world)

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
