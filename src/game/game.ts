import { Application, Container } from 'pixi.js'
import { Castle, Forest } from './objects'

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

    document.getElementById('game-canvas')?.appendChild(this.app.canvas)
  }
}

export class Game extends Container {
  scene: Scene
  isPaused: boolean = false

  private castle: Castle | null = null
  private forest: Forest | null = null

  constructor() {
    super()
    this.scene = new Scene()
  }

  async play() {
    this.castle = new Castle({ game: this })
    this.scene.app.stage.addChild(this.castle)

    this.forest = new Forest({ game: this, x: 100, y: 100 })
    this.scene.app.stage.addChild(this.forest)

    this.scene.app.ticker.add(() => {
      this.draw()
    })

    console.log(this)
  }

  draw() {
    if (this.castle) {
      this.castle.update()
    }
    if (this.forest) {
      this.forest.update()
    }
  }
}
