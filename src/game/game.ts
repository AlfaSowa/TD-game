import { Application, Container } from 'pixi.js'
import { TAIL_SIZE } from './constants'
import { CastleService } from './services'
import { IGame } from './types'

export class Game extends Container implements IGame {
  app: Application

  private castleService: CastleService
  // private sawmillService: SawmillService
  // private forestService: ForestService

  constructor() {
    super()
    this.app = new Application()

    this.castleService = new CastleService(this)
    // this.sawmillService = new SawmillService(this)
    // this.forestService = new ForestService(this)
  }

  async init() {
    await this.app.init({
      background: 'rgba(197, 187, 164)',
      resizeTo: window,
      roundPixels: false,
      resolution: 1,
      preference: 'webgl'
    })

    this.app.canvas.width = window.innerWidth - (window.innerWidth % TAIL_SIZE)
    this.app.canvas.height = window.innerHeight - (window.innerHeight % TAIL_SIZE)

    document.getElementById('game-canvas')?.appendChild(this.app.canvas)

    //services
    this.castleService.init()
    // this.sawmillService.init()
    // this.forestService.init()

    this.app.ticker.add(() => {
      this.castleService.update()
      // this.sawmillService.update()
      // this.forestService.update()
    })
  }
}
