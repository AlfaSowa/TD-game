import { Assets, Sprite } from 'pixi.js'
import CastleImage from '../../../../assets/images/Castle_Construction.png'
import { BaseBuild } from '../base'

export class Castle extends BaseBuild {
  async init() {
    const texture = await Assets.load(CastleImage)
    const sprite = new Sprite(texture)

    this.addChild(sprite)

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }
  }

  update() {}
}
