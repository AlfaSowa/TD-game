import { World } from '../../../engine/core'
import { SelectableComponent } from '../../../engine/ecs/components'
import { System } from '../../../engine/ecs/systems'
import { SystemPriority } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { DamageComponent, EnemyComponent, HealthComponent, PlayerComponent } from '../components'

export class DamageSystem implements System {
  priority: SystemPriority = SystemPriority.HIGH

  update(ctx: EngineContext, dt: number): void {
    const world = ctx.get<World>(World)

    for (const entity of world.with(EnemyComponent, SelectableComponent, DamageComponent)) {
      const health = world.getComponent(entity, HealthComponent)!
      const damage = world.getComponent(entity, DamageComponent)!
      const selectable = world.getComponent(entity, SelectableComponent)!

      const player = world.getOrCreateSingleton(PlayerComponent, new PlayerComponent())
      const playerComponent = world.getComponent(player, PlayerComponent)
      const playerHealth = world.getComponent(player, HealthComponent)!
      const playerdamage = world.getComponent(player, DamageComponent)!

      if (selectable.selected) {
        console.log(1, 'player', 'h-' + playerHealth.health, 'd-' + playerdamage.damage)
        console.log(2, 'enemy', 'h-' + health.health, 'd-' + damage.damage)
        health.health = health.health - playerdamage.damage
        console.log(3, 'enemy', 'h-' + health.health, 'd-' + damage.damage)
        selectable.selected = false
      }
    }
  }
}
