import { Assets, Sprite } from 'pixi.js'
import FarmImage from '../../../../assets/images/House_Blue.png'
import { BaseBuild } from '../base'

export class Farm extends BaseBuild {
  gap: number = 2

  async init() {
    const texture = await Assets.load(FarmImage)
    const sprite = new Sprite(texture)

    sprite.position.x = 150

    this.addChild(sprite)
    this.position.set(20, 20)
  }

  update() {}
}
