import { Application, Container, Graphics, Sprite } from 'pixi.js'
import { World } from '../../../engine/core'
import { ClickableComponent, SelectableComponent } from '../../../engine/ecs/components'
import { Entity } from '../../../engine/ecs/entities'
import { System } from '../../../engine/ecs/systems'
import { SYSTEM_PRIORITY } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { UiSlot } from '../../../engine/ui'
import { drawSquareFields } from '../../../engine/utils'
import { enemyConfigs, EnemyType, playerConfig } from '../../configs'
import { BattleConfigType, PlayerSpellConfigType } from '../../managers'
import {
  BattleComponent,
  BattlePhase,
  DamageComponent,
  EnemyComponent,
  HealthComponent,
  PlayerTagComponent,
  SpellComponent
} from '../components'

export class BattleInitSystem implements System {
  priority = SYSTEM_PRIORITY.LOW

  view: Container
  texture: any
  container: Container = new Container()
  spells: Container = new Container()

  battleConfig: BattleConfigType
  playerSpellConfig: PlayerSpellConfigType

  constructor(view: Container, texture: any, battleConfig: BattleConfigType, playerSpellConfig: PlayerSpellConfigType) {
    this.view = view
    this.texture = texture
    this.battleConfig = battleConfig
    this.playerSpellConfig = playerSpellConfig
  }

  update(ctx: EngineContext, dt: number) {
    const world = ctx.get<World>(World)
    const app = ctx.get<Application>(Application)

    const battleEntity = world.getOrCreateSingleton(BattleComponent, new BattleComponent())
    const battle = world.getComponent(battleEntity, BattleComponent)

    if (battle?.phase === BattlePhase.INIT) {
      console.log('Game INIT')

      drawSquareFields({
        container: this.container,
        xAmount: this.battleConfig.field.w,
        yAmount: this.battleConfig.field.h,
        gap: 2,
        renderElementFx: () =>
          new UiSlot(
            app.canvas.width / 5 - (app.canvas.width / 100) * 4,
            app.canvas.width / 5 - (app.canvas.width / 100) * 4
          )
      })

      this.container.position.set(app.canvas.width / 2 - this.container.width / 2, 300)

      this.view.addChild(this.container)

      this.createPlayer(world, app)

      this.createSpells(world, app)

      for (const enemy of this.battleConfig.enemies) {
        const enemySlot = this.container.children[enemy.position]

        if (enemySlot) {
          const enemyEntity = this.createEnemy(world, enemy.type)

          enemyEntity.addChild(new Sprite(this.texture.default[enemy.texture]))

          enemyEntity.width = enemySlot.width
          enemyEntity.height = enemySlot.height

          enemySlot.addChild(enemyEntity)
        }
      }

      battle.phase = BattlePhase.GAME_START

      console.log(222, world.with(SpellComponent, SelectableComponent))
      console.log(222, world.with(EnemyComponent, SelectableComponent))
    }
  }

  createSpells(world: World, app: Application) {
    drawSquareFields({
      container: this.spells,
      xAmount: 5,
      yAmount: 1,
      gap: 2,
      renderElementFx: () =>
        new UiSlot(
          app.canvas.width / 5 - (app.canvas.width / 100) * 4,
          app.canvas.width / 5 - (app.canvas.width / 100) * 4
        )
    })

    this.spells.position.set(app.canvas.width / 2 - this.spells.width / 2, 100)

    this.view.addChild(this.spells)

    for (const spell of this.playerSpellConfig.spells) {
      const slot = this.spells.children[spell.position]

      if (slot) {
        const entity = world.createEntity(Entity)

        world.addComponent(entity, new ClickableComponent())
        world.addComponent(entity, new SelectableComponent())
        world.addComponent(entity, new SpellComponent())

        entity.addChild(new Sprite(this.texture.default[spell.texture]))

        entity.width = slot.width
        entity.height = slot.height

        slot.addChild(entity)
      }
    }
  }

  createPlayer(world: World, app: Application) {
    const player = world.getOrCreateSingleton(PlayerTagComponent, new PlayerTagComponent())

    player.addChild(new Graphics().rect(0, 0, 50, 50).fill({ color: 'green' }))
    player.position.set(app.canvas.width / 2 - player.width / 2, 30)

    player.eventMode = 'static'
    player.cursor = 'pointer'

    player.on('pointerup', () => {
      console.log('click player')
    })

    world.addComponent(player, new HealthComponent(playerConfig.health))
    world.addComponent(player, new DamageComponent(playerConfig.damage))
    world.addComponent(player, new PlayerTagComponent())

    this.view.addChild(player)
  }

  createEnemy(world: World, type: EnemyType) {
    const enemyEntity = world.createEntity(Entity)

    const config = enemyConfigs[type]

    world.addComponent(enemyEntity, new HealthComponent(config.health))
    world.addComponent(enemyEntity, new DamageComponent(config.damage))

    world.addComponent(enemyEntity, new EnemyComponent())
    world.addComponent(enemyEntity, new ClickableComponent())
    world.addComponent(enemyEntity, new SelectableComponent())

    return enemyEntity
  }

  onRemove(): void {
    this.container.removeFromParent()
    this.container.destroy()
  }
}
