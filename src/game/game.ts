import { Application, Assets, Container, Sprite } from 'pixi.js'
import { Signal } from 'typed-signals'
import { Mediator, state } from './helpers'
import { CastleSystem, CitySystem, ScreensSystem, SpawnersSystem, SystemRunner } from './systems'

export class Game extends Container {
  app: Application

  systems: SystemRunner

  mediator!: Mediator

  isStarted: boolean = false

  public signals = {
    onGoldUpdate: new Signal<(value: number) => void>(),
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

    await Assets.init({ manifest: '/game-manifest.json', basePath: 'assets' })
    const backgroundAssets = await Assets.loadBundle('backgrounds')
    const sprite = Sprite.from(backgroundAssets.map)
    // this.app.stage.addChild(sprite)
  }

  async init() {
    await this.app.init({
      background: '#403d39',
      resizeTo: window,
      roundPixels: false,
      resolution: 1,
      preference: 'webgl'
    })

    console.log('app', this.app)

    document.getElementById('game-canvas')?.appendChild(this.app.canvas)

    await this.initAssets()

    state.init(this)

    //systems
    //core
    this.systems.add(ScreensSystem)
    this.systems.add(SpawnersSystem)
    // this.systems.add(TimersSystem)

    //entities
    this.systems.add(CitySystem)
    // this.systems.add(FarmSystem)
    this.systems.add(CastleSystem)
    // this.systems.add(SawmillSystem)

    //helpers
    // this.systems.add(ResourcesSystem)

    this.systems.init()

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
