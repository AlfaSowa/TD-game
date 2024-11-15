import { Viewport } from 'pixi-viewport'
import { Application, Container, Graphics } from 'pixi.js'

export class PossessionScreen extends Container {
  viewport!: Viewport

  init(app: Application) {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,
      events: app.renderer.events
    })

    this.viewport.moveCenter(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2)

    this.viewport.drag().clamp({ direction: 'all' })

    console.log(this.viewport, 12312)

    this.addChild(this.viewport)

    this.viewport.addChild(new Graphics().rect(0, 0, 1000, 1000).stroke({ color: '#487f5c' }))
  }

  addContainer(container: Container) {
    this.viewport.addChild(container)
  }

  update() {}
}
