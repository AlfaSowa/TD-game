import { Application, Container } from 'pixi.js'
import { Signal } from 'typed-signals'
import { Mediator, state } from '../core'
import { SystemRunner } from './system-runner'
import { FarmSystem, ScreensSystem } from './systems'
import { IGame } from './types'

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

  async init() {
    await this.app.init({
      background: 'rgba(197, 187, 164)',
      resizeTo: window,
      roundPixels: false,
      resolution: 1,
      preference: 'webgl'
    })

    console.log('app', this.app)

    document.getElementById('game-canvas')?.appendChild(this.app.canvas)

    state.init(this)

    //systems
    this.systems.add(ScreensSystem)
    this.systems.add(FarmSystem)

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
