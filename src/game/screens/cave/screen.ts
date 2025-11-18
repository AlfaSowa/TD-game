import { Viewport } from 'pixi-viewport-new'
import { Application, Container, Graphics } from 'pixi.js'
import { BaseScreen } from '../base'
import { CaveScreenSystem } from './system'

const HEADER_WIDTH = 200

export class CaveScreen extends BaseScreen {
  SCREEN_NAME = 'cave-screen'

  header: Container = new Container()
  main: Container = new Container()

  bgId: number = 0

  init(app: Application) {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: app.canvas.width,
      worldHeight: app.canvas.height,
      events: app.renderer.events
    })

    this.activeContainer.addChild(new Graphics().rect(0, 0, 400, 400).fill({ color: '#a8ae51' }))

    this.viewport.addChild(this.activeContainer)

    const headerBg = new Graphics().rect(0, 0, app.canvas.width, HEADER_WIDTH).fill({ color: '#62B1D0' })
    this.header.addChild(headerBg)

    const mainBg = new Graphics().rect(0, 0, app.canvas.width, app.canvas.height).fill({ color: '#024C68' })

    this.bgId = mainBg.uid

    this.main.addChild(mainBg)
    // this.main.position.y = HEADER_WIDTH

    // this.addContainer(this.header)
    this.addContainer(this.main)

    this.addChild(this.viewport)
  }

  resetMainContainer() {
    for (let i = 0; i < this.main.children.length; i++) {
      if (this.main.children[i].uid !== this.bgId) this.main.removeChildAt(i)
    }
  }

  addContainer(container: Container) {
    this.activeContainer.addChild(container)
  }

  updateContent(container: Container) {
    for (let i = 0; i < this.main.children.length; i++) {
      if (this.main.children[i].uid !== this.bgId) this.main.removeChildAt(i)
    }
    this.main.addChild(container)

    console.log('this.main', this.main)
  }

  onLoad() {
    this.game.systems.get(CaveScreenSystem).loadCavePoints()
  }

  update() {}
}
