import { Application, Container } from 'pixi.js'
import { Signal } from 'typed-signals'
import { Mediator, state } from '../core'
import { TAIL_SIZE } from './constants'
import { SystemRunner } from './system-runner'
import { FarmSystem } from './systems'
import { IGame } from './types'

export class Game extends Container implements IGame {
  app: Application

  systems: SystemRunner

  mediator!: Mediator

  public signals = {
    onCoinsUpdate: new Signal<(value: number) => void>()
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

    this.app.canvas.width = window.innerWidth - (window.innerWidth % TAIL_SIZE)
    this.app.canvas.height = window.innerHeight - (window.innerHeight % TAIL_SIZE)

    document.getElementById('game-canvas')?.appendChild(this.app.canvas)

    //systems
    // this.systems.add(CastleSystem)
    state.init(this)
    this.systems.add(FarmSystem)

    this.systems.init()

    this.app.ticker.add(() => {
      this.systems.update()
    })
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator
  }
}
