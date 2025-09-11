import { Viewport } from 'pixi-viewport'
import { Application, Container, Graphics } from 'pixi.js'

export class TDScreen extends Container {
  SCREEN_NAME = 'td'

  viewport!: Viewport
  activeContainer: Container = new Container()

  public signals = {}

  init(app: Application) {
    this.addChild(new Graphics().rect(0, 0, 430, 932).fill({ color: '#2f4a6a' }))
  }

  addContainer(container: Container) {
    this.addChild(container)
  }

  update() {}
}
