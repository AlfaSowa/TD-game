import { Application, Assets } from 'pixi.js'
import manifest from '../../../public/manifest.json'
import { ClickSystem, HighlightSystem, MovementSystem, SystemRunner } from '../ecs/systems'
import { SelectSystem } from '../ecs/systems/select-system'
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

    await Assets.init({ manifest })

    this.app.stage.eventMode = 'static'
    this.app.stage.cursor = 'pointer'

    this.app.stage.on('pointerup', (event) => {
      const target = event.target

      if (!target || !target.uid) {
        this.world.emit('emptyClicked', { originalEvent: event })
        this.world.emit('selectTarget', { originalEvent: event })
        this.world.emit('selectAbility', { originalEvent: event })
        return
      }

      this.world.emit('entityClicked', {
        entityId: target.uid,
        originalEvent: event,
        mouse: event.global
      })

      this.world.emit('selectTarget', {
        entityId: target.uid,
        originalEvent: event,
        mouse: event.global
      })

      this.world.emit('selectAbility', {
        entityId: target.uid,
        originalEvent: event,
        mouse: event.global
      })
    })

    canvas!.appendChild(this.app.canvas)

    this.engineContext.register(World, this.world)
    this.engineContext.register(Application, this.app)
    this.engineContext.register(SceneManager, this.sceneManager)
    this.engineContext.register(SystemRunner, this.systems)

    this.systems.init(this.engineContext)

    this.systems.add(new MovementSystem())
    this.systems.add(new ClickSystem())
    this.systems.add(new SelectSystem())
    this.systems.add(new HighlightSystem())

    this.sceneManager.init(this.app, this)
    this.uiManager.init(this.app, this)
  }

  start(update: (dt: number) => void) {
    this.app.ticker.add(() => {
      this.systems.update(this.app.ticker.deltaTime)
      this.sceneManager.update(this.app.ticker.deltaTime)

      update(this.app.ticker.deltaTime)
    })
  }
}
