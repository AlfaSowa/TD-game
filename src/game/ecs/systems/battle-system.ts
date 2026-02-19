import { World } from '../../../engine/core'
import { SelectableComponent } from '../../../engine/ecs/components'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import {
  EnemyComponent,
  HealthComponent,
  IntervalDamageComponent,
  PlayerTagComponent,
  TurnComponent
} from '../components'
import { BattleComponent, BattlePhase } from '../components/battle-component'

export class BattleSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    const battleEntity = world.getOrCreateSingleton(BattleComponent, new BattleComponent())
    const battle = world.getComponent(battleEntity, BattleComponent)

    if (battle?.phase === BattlePhase.GAME_START) {
      for (const entity of world.with(EnemyComponent, SelectableComponent)) {
        const enemyComponent = world.getComponent(entity, EnemyComponent)!
        const selectable = world.getComponent(entity, SelectableComponent)!

        const player = world.getOrCreateSingleton(PlayerTagComponent, new PlayerTagComponent())
        const playerComponent = world.getComponent(player, PlayerTagComponent)

        const turnEntity = world.getOrCreateSingleton(TurnComponent, new TurnComponent())
        const turnComponent = world.getComponent(turnEntity, TurnComponent)!

        if (selectable.selected && turnComponent.btnPressed) {
          console.log('world', world)

          turnComponent.attacker = player
          world.addComponent(entity, new IntervalDamageComponent({ damagePerTick: 50, duration: 3, interval: 1 }))

          turnComponent.defender = entity

          selectable.selected = false
          turnComponent.btnPressed = false
        }
      }
    }
  }

  onRemove(ctx: EngineContext): void {
    const world = ctx.get<World>(World)

    const battleEntity = world.getOrCreateSingleton(BattleComponent, new BattleComponent())
    const battle = world.getComponent(battleEntity, BattleComponent)

    if (battle) {
      battle.phase = BattlePhase.INIT
    }

    for (const entity of world.with(HealthComponent)) {
      world.destroyEntity(entity)
    }
  }
}
