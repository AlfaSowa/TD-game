import { Container, Graphics } from 'pixi.js'
import { Vector2 } from '../../utils'
import { Engine } from '../core'

const PADDING = 20
export class UiBox {
  engine!: Engine
  view: Graphics = new Graphics()

  constructor(position: Vector2) {
    this.view.position.set(position.x, position.y)
    this.resize()
  }

  addContainer(container: Container) {
    this.view.addChild(container)
  }

  init(engine: Engine) {
    this.engine = engine
  }

  resize() {
    this.view.clear()
    this.view.rect(0, 0, this.view.width + PADDING, this.view.height + PADDING).fill({ color: 'green' })
  }

  update(dt: number) {}
}
