import { Viewport } from 'pixi-viewport-new'
import { Application, Container, Graphics } from 'pixi.js'

const HEADER_WIDTH = 200

export class CaveScreen extends Container {
  SCREEN_NAME = 'cave-screen'
  viewport!: Viewport

  activeContainer: Container = new Container()

  header: Container = new Container()
  main: Container = new Container()

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

    const mainBg = new Graphics()
      .rect(0, 0, app.canvas.width, app.canvas.height - HEADER_WIDTH)
      .fill({ color: '#024C68' })
    this.main.addChild(mainBg)
    this.main.position.y = HEADER_WIDTH

    this.addContainer(this.header)
    this.addContainer(this.main)

    this.addChild(this.viewport)
  }

  addContainer(container: Container) {
    this.activeContainer.addChild(container)
  }

  updateContent(container: Container) {
    this.main.addChild(container)

    console.log('this.main', this.main)
  }

  update() {}
}
