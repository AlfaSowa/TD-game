import { Application, Container } from 'pixi.js'
import { Player } from './units'
import { Spawner } from './core'

class SceneManager {
  public app: Application

  constructor() {
    this.app = new Application()
    void this.init()
  }

  public async init() {
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
  scene: SceneManager
  isPaused: boolean = false

  private player: Player | null = null
  private spawner: Spawner | null = null

  constructor() {
    super()

    this.scene = new SceneManager()
  }

  async play() {
    this.player = new Player({ game: this })
    this.scene.app.stage.addChild(this.player)

    this.spawner = new Spawner({ game: this, player: this.player })
    this.scene.app.stage.addChild(this.spawner)

    this.scene.app.ticker.add(() => {
      this.draw()
    })

    console.log(this.scene.app.stage)
  }

  draw() {
    if (this.player) {
      this.player.update()
    }

    if (this.spawner) {
      this.spawner.update()
    }
  }
}
