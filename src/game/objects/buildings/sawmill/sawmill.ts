import { Graphics } from 'pixi.js'
import { BaseBuild } from '../base'

export class Sawmill extends BaseBuild {
  init() {
    this.addChild(new Graphics().rect(0, 0, 100, 100).stroke({ color: 'green' }))

    this.position.set(800, 700)
  }
  update() {}
}
