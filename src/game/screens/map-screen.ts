import { Container, Graphics } from 'pixi.js'

export class MapScreen extends Container {
  init() {
    this.addChild(new Graphics().rect(0, 0, 430, 932).fill({ color: '#487f5c' }))
  }

  addContainer(container: Container) {
    this.addChild(container)
  }

  update() {}
}
