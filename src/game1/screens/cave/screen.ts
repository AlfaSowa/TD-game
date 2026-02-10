import { Viewport } from 'pixi-viewport-new'
import { Application, Container, Graphics } from 'pixi.js'
import { CavePoint } from '../../entities'
import { EntitiesRenderSystem } from '../../systems'
import { BaseScreen } from '../base'
import { ScreensSystem } from '../system'

const POINTS = 3
export class CaveScreen extends BaseScreen {
  SCREEN_NAME = 'cave-screen'

  roads: Container = new Container()

  init(app: Application) {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: app.canvas.width,
      worldHeight: app.canvas.height,
      events: app.renderer.events
    })

    this.activeContainer.addChild(
      new Graphics().rect(0, 0, app.canvas.width, app.canvas.height).fill({ color: '#a8ae51' })
    )

    this.viewport.addChild(this.activeContainer)

    this.addChild(this.viewport)
  }

  addContainer(container: Container) {
    this.activeContainer.addChild(container)
  }

  createRoads() {
    for (let i = 0; i < POINTS; i++) {
      const point = new CavePoint({ game: this.game })
      point.init()
      point.position.set(this.game.app.canvas.width / 2 - 50, i * 200)

      point.clicked(() => {
        this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('dungeonMap')
      })

      this.roads.addChild(point)
    }

    this.addChild(this.roads)
  }

  onFirstLoad() {
    console.log('CaveScreen isFirstLoaded')

    this.game.systems.get(EntitiesRenderSystem).renderData('cave')

    this.isFirstLoaded = true
  }

  async onLoad() {
    console.log('CaveScreen onLoad')

    if (!this.isFirstLoaded) {
      await this.onFirstLoad()
    }

    this.createRoads()
  }

  update() {}
}
