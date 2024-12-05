import { Assets, Sprite } from 'pixi.js'
import TowerImage from '../../../../assets/images/Tower_Blue.png'
import { BaseBuild } from '../base'

export class Sawmill extends BaseBuild {
  async init() {
    const texture = await Assets.load(TowerImage)
    const sprite = new Sprite(texture)

    this.addChild(sprite)

    this.position.set(800, 700)
  }
  update() {}
}
