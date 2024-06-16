import { Application, Container } from 'pixi.js'
import { TAIL_SIZE } from './constants'
import { pathfinder } from './core'
import { Castle, Forest } from './objects'
import { Sawmill } from './objects/buildings/sawmill'

class Scene {
  app: Application

  constructor() {
    this.app = new Application()
    this.init()
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
  }
}

export class Game extends Container {
  scene: Scene
  isPaused: boolean = false

  private castle: Castle | null = null
  private forest: Forest | null = null
  private sawmill: Sawmill | null = null

  constructor() {
    super()
    this.scene = new Scene()
  }

  async play() {
    pathfinder.init(this)

    this.castle = new Castle({ game: this })
    this.scene.app.stage.addChild(this.castle)

    this.forest = new Forest()
    this.scene.app.stage.addChild(this.forest)

    this.sawmill = new Sawmill({ game: this })
    this.scene.app.stage.addChild(this.sawmill)

    this.scene.app.ticker.add(() => {
      this.draw()
    })
  }

  draw() {
    if (this.castle) {
      this.castle.update()
    }
    if (this.sawmill) {
      this.sawmill.update()
    }
    if (this.forest) {
      this.forest.update()
    }
  }
}
