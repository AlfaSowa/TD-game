import { Application, Graphics } from 'pixi.js'
import { Engine, Scene } from '../../engine/core'
import { MovementComponent, VelocityComponent } from '../../engine/ecs/components'
import { Entity } from '../../engine/ecs/entities'

export class MapScene extends Scene {
  player!: Entity

  init(app: Application, engine: Engine, isViewport?: boolean): void {
    super.init(app, engine, isViewport)

    this.player = this.engine.world.createEntity(Entity)
    this.player.addChild(new Graphics().rect(0, 0, 30, 30).fill({ color: 'red' }))

    this.engine.world.addComponent(this.player, new MovementComponent())
    this.engine.world.addComponent(this.player, new VelocityComponent(5))
  }

  onLoad() {
    this.engine.app.stage.addChild(this.player)
  }

  onUnLoad() {
    this.player.removeFromParent()
  }
}
