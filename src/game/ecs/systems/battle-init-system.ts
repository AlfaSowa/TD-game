import { Application, Container, Graphics, Sprite } from 'pixi.js'
import { World } from '../../../engine/core'
import { ClickableComponent, SelectableComponent } from '../../../engine/ecs/components'
import { Entity } from '../../../engine/ecs/entities'
import { System } from '../../../engine/ecs/systems'
import { SystemPriority } from '../../../engine/ecs/systems/types'
import { EngineContext } from '../../../engine/engine-ctx'
import { SceneManager } from '../../../engine/managers'
import { UiSlot } from '../../../engine/ui'
import { drawSquareFields } from '../../../engine/utils'
import { MapScene } from '../../scenes'
import { BattleComponent, BattlePhase, EnemyComponent, HealthComponent } from '../components'

export class BattleInitSystem implements System {
  priority: SystemPriority = SystemPriority.LOW
  view: Container
  texture: any
  container: Container = new Container()

  constructor(view: Container, texture: any) {
    this.view = view
    this.texture = texture
  }

  update(ctx: EngineContext, dt: number) {
    const world = ctx.get<World>(World)
    const sceneManager = ctx.get<SceneManager>(SceneManager)
    const app = ctx.get<Application>(Application)

    const battleEntity = world.getOrCreateSingleton(BattleComponent, new BattleComponent())
    const battle = world.getComponent(battleEntity, BattleComponent)

    if (battle?.phase === BattlePhase.INIT) {
      console.log('Game INIT')

      drawSquareFields({
        container: this.container,
        xAmount: 5,
        gap: 2,
        renderElementFx: () =>
          new UiSlot(
            app.canvas.width / 5 - (app.canvas.width / 100) * 4,
            app.canvas.width / 5 - (app.canvas.width / 100) * 4
          )
      })

      this.container.position.set(app.canvas.width / 2 - this.container.width / 2, 300)

      this.view.addChild(this.container)

      const player = world.createEntity(Entity)
      player.addChild(new Graphics().rect(0, 0, 50, 50).fill({ color: 'green' }))
      player.position.set(app.canvas.width / 2 - player.width / 2, 30)

      player.eventMode = 'static'
      player.cursor = 'pointer'

      player.on('pointerup', () => {
        sceneManager.loadScene(MapScene)
      })

      world.addComponent(player, new HealthComponent(100))

      this.view.addChild(player)

      for (let i = 0; i < 4; i++) {
        const enemy = world.createEntity(Entity)

        enemy.addChild(new Sprite(this.texture.default['Tree2.png']))

        enemy.width = this.container.children[i].width
        enemy.height = this.container.children[i].height

        this.container.children[i].addChild(enemy)

        enemy.position.set(
          this.container.children[i].width / 2 - enemy.width / 2,
          this.container.children[i].height / 2 - enemy.height / 2
        )

        world.addComponent(enemy, new HealthComponent(50))
        world.addComponent(enemy, new EnemyComponent())
        world.addComponent(enemy, new ClickableComponent())
        world.addComponent(enemy, new SelectableComponent())
      }

      battle.phase = BattlePhase.GAME_START
    }
  }

  onRemove(): void {
    this.container.removeFromParent()
    this.container.destroy()
  }
}
