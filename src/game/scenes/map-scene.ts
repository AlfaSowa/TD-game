import { Application, Graphics } from 'pixi.js'
import { Engine, Scene } from '../../engine/core'
import { MovementComponent, VelocityComponent } from '../../engine/ecs/components'
import { Entity } from '../../engine/ecs/entities'
import { MainMenuScene } from './main-menu-scene'

export class MapScene extends Scene {
  testEntity!: Entity

  init(app: Application, engine: Engine, isViewport?: boolean): void {
    super.init(app, engine, isViewport)

    this.testEntity = this.engine.world.createEntity(Entity)
    this.testEntity.addChild(new Graphics().rect(0, 0, 30, 30).fill({ color: 'red' }))

    this.engine.world.addComponent(this.testEntity, new MovementComponent())
    this.engine.world.addComponent(this.testEntity, new VelocityComponent(5))

    this.testEntity.eventMode = 'static'
    this.testEntity.cursor = 'pointer'

    this.testEntity.on('pointerup', () => {
      engine.sceneManager.loadScene(MainMenuScene)
    })
  }

  onLoad() {
    this.engine.app.stage.addChild(this.testEntity)
  }

  onUnLoad() {
    this.testEntity.removeFromParent()
  }
}
