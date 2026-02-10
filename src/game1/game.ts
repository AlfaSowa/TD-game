import { Application, Assets, Container } from 'pixi.js'
import { Signal } from 'typed-signals'
import manifest from '../../public/manifest.json'
import { coreSystems } from './core-sysytems'
import { Mediator, state } from './helpers'
import { SystemRunner } from './systems'

export class Game extends Container {
  app: Application

  systems: SystemRunner

  mediator!: Mediator

  isStarted: boolean = false

  public signals = {
    onGameStarted: new Signal<(isStarted: boolean) => void>()
  }

  constructor() {
    super()
    this.app = new Application()

    this.systems = new SystemRunner(this)

    new Mediator(this)
  }

  async initAssets() {
    // const texture = await Assets.load(bg)

    // const bgSprite = new TilingSprite({
    //   texture,
    //   width: this.app.screen.width,
    //   height: this.app.screen.height
    // })

    // this.app.stage.addChild(bgSprite)

    await Assets.init({ manifest })
  }

  async init() {
    const canvasWrapper = document.getElementById('canvas-wrapper')

    await this.app.init({
      background: '#403d39',
      width: window.innerWidth,
      height: canvasWrapper!.clientHeight - 96,
      roundPixels: false,
      resolution: 1,
      preference: 'webgpu'
    })

    await this.initAssets()

    canvasWrapper!.appendChild(this.app.canvas)

    state.init(this)

    //init systems
    coreSystems(this.systems)

    this.isStarted = true

    this.signals.onGameStarted.emit(true)

    this.app.ticker.add(() => {
      if (this.isStarted) {
        this.systems.update()
      }
    })

    return this
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator
  }
}
