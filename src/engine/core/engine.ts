import { Application } from 'pixi.js'
import { MovementSystem, SystemRunner } from '../ecs/systems'
import { EngineContext } from '../engine-ctx'
import { SceneManager, UiManager } from '../managers'
import { World } from './world'

export class Engine {
  app: Application = new Application()

  //core
  systems: SystemRunner = new SystemRunner()
  engineContext = new EngineContext()

  //managers
  sceneManager: SceneManager = new SceneManager()
  uiManager: UiManager = new UiManager()

  world = new World()

  async init(canvas: HTMLElement) {
    await this.app.init({
      background: '#403d39',
      width: window.innerWidth,
      height: window.innerHeight,
      roundPixels: false,
      resolution: 1,
      preference: 'webgpu'
    })

    canvas!.appendChild(this.app.canvas)

    this.engineContext.register(World, this.world)

    this.systems.add(new MovementSystem())

    this.systems.init()

    this.sceneManager.init(this.app, this)
    this.uiManager.init(this.app, this)
  }

  start(update: (dt: number) => void) {
    this.app.ticker.add(() => {
      this.systems.update(this.engineContext, this.app.ticker.deltaTime)
      this.sceneManager.update(this.app.ticker.deltaTime)

      update(this.app.ticker.deltaTime)
    })
  }
}
