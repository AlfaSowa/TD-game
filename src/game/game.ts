import { Graphics } from 'pixi.js'
import { Signal } from 'typed-signals'
import { Engine } from '../engine/core'
import { MovementComponent, VelocityComponent } from '../engine/ecs/components'
import { Entity } from '../engine/ecs/entities'
import { MapScene } from './scenes'

export class Game {
  engine: Engine = new Engine()
  isStarted: boolean = false

  public signals = {
    onGameStarted: new Signal<(isStarted: boolean) => void>()
  }

  async init() {
    const canvasWrapper = document.getElementById('canvas-wrapper')

    if (canvasWrapper) {
      this.isStarted = true
      this.signals.onGameStarted.emit(true)

      await this.engine.init(canvasWrapper)

      const player = this.engine.world.createEntity(Entity)
      player.addChild(new Graphics().rect(0, 0, 30, 30).fill({ color: 'red' }))
      this.engine.app.stage.addChild(player)

      this.engine.world.addComponent(player, new MovementComponent())
      this.engine.world.addComponent(player, new VelocityComponent(5))

      this.engine.sceneManager.add(MapScene)

      this.engine.sceneManager.loadScene(MapScene)

      this.engine.start(this.update)
    }
  }

  update(dt: number) {}
}
