import { Viewport } from 'pixi-viewport'
import { Container, Graphics } from 'pixi.js'

export class TDScreen extends Container {
  viewport!: Viewport
  activeContainer: Container = new Container()

  public signals = {}

  init() {
    this.addChild(new Graphics().rect(0, 0, 430, 932).fill({ color: '#2f4a6a' }))
  }

  addContainer(container: Container) {
    this.addChild(container)
  }

  update() {}
}
