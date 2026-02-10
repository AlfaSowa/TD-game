import { Application } from 'pixi.js'
import { PositionComponent } from '../ecs/components'
import { Entity } from '../ecs/entities'
import { MovementSystem, SystemRunner } from '../ecs/systems'
import { EngineContext } from '../engine-ctx'
import { Vector3 } from '../utils'
import { World } from './world'

export class Engine {
  app: Application = new Application()
  systems!: SystemRunner

  world = new World()

  async init(canvas: HTMLElement, update: (dt: number) => void) {
    this.systems = new SystemRunner()

    await this.app.init({
      background: '#403d39',
      width: window.innerWidth,
      height: canvas!.clientHeight,
      roundPixels: false,
      resolution: 1,
      preference: 'webgpu'
    })

    canvas!.appendChild(this.app.canvas)

    const engineContext = new EngineContext()
    engineContext.register(World, this.world)

    this.systems.add(new MovementSystem())

    this.systems.init()

    const player = this.world.createEntity(Entity)
    this.world.addComponent(player, new PositionComponent(new Vector3(0, 0, 0)))

    this.app.ticker.add(() => {
      update(this.app.ticker.deltaTime)
      this.systems.update(engineContext, this.app.ticker.deltaTime)
    })
  }
}
