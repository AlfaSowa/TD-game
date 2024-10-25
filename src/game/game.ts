import { Application, Container } from 'pixi.js'
import { TAIL_SIZE } from './constants'
import { SystemRunner } from './system-runner'
import { CastleSystem } from './systems'
import { IGame } from './types'

export class Game extends Container implements IGame {
  app: Application

  systems: SystemRunner

  constructor() {
    super()
    this.app = new Application()

    this.systems = new SystemRunner(this)
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
    this.systems.add(CastleSystem)

    this.systems.init()

    this.app.ticker.add(() => {
      this.systems.update()
    })
  }
}
