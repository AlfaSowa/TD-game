import { Application } from 'pixi.js'
import { MovementSystem, SystemRunner } from '../ecs/systems'
import { EngineContext } from '../engine-ctx'
import { World } from './world'

export class Engine {
  app: Application = new Application()
  systems!: SystemRunner

  world = new World()

  async init(canvas: HTMLElement, update: (dt: number) => void) {
    this.systems = new SystemRunner()

    console.log('canvas', canvas)

    await this.app.init({
      background: '#403d39',
      width: window.innerWidth,
      height: window.innerHeight,
      roundPixels: false,
      resolution: 1,
      preference: 'webgpu'
    })

    canvas!.appendChild(this.app.canvas)

    const engineContext = new EngineContext()
    engineContext.register(World, this.world)

    this.systems.add(new MovementSystem())

    this.systems.init()

    console.log(this.app)

    this.app.ticker.add(() => {
      update(this.app.ticker.deltaTime)
      this.systems.update(engineContext, this.app.ticker.deltaTime)
    })
  }
}
