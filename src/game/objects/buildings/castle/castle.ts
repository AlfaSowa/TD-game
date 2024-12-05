import { Graphics } from 'pixi.js'
import { BaseBuild } from '../base'

export class Castle extends BaseBuild {
  init() {
    this.addChild(new Graphics().rect(0, 0, 300, 300).fill({ color: 'rgba(149, 138, 122)' }))

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }
  }
  update() {}
}
