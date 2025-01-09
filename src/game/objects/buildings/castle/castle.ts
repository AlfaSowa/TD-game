import { Assets, Sprite } from 'pixi.js'
import CastleReadyImage from '../../../../assets/images/Castle_Blue.png'
import { BaseBuild } from '../base'

export class Castle extends BaseBuild {
  async init() {
    // const castle = await Assets.load(CastleImage)
    const castleReady = await Assets.load(CastleReadyImage)
    const sprite = new Sprite({ texture: castleReady })

    this.addChild(sprite)

    if (this.parent) {
      this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
    }
  }

  update() {}
}
