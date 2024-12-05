import { Application, Assets, Container, Sprite } from 'pixi.js'
import { Signal } from 'typed-signals'
import { Mediator, state } from '../core'
import { SystemRunner } from './system-runner'
import { CastleSystem, CitySystem, FarmSystem, SawmillSystem, ScreensSystem } from './systems'
import { IGame } from './types'

import bg from '../assets/images/tileset.png'

export class Game extends Container implements IGame {
  app: Application

  systems: SystemRunner

  mediator!: Mediator

  isStarted: boolean = false

  public signals = {
    onCoinsUpdate: new Signal<(value: number) => void>(),
    onGameStarted: new Signal<(isStarted: boolean) => void>()
  }

  constructor() {
    super()
    this.app = new Application()

    this.systems = new SystemRunner(this)

    new Mediator(this)
  }

  async initAssets() {
    console.log(bg)

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
    this.systems.add(ScreensSystem)
    this.systems.add(CitySystem)
    this.systems.add(FarmSystem)
    this.systems.add(CastleSystem)
    this.systems.add(SawmillSystem)

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
