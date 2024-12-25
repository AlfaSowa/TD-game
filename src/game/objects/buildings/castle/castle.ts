import { Assets, Sprite, Text } from 'pixi.js'
import CastleImage from '../../../../assets/images/Castle_Construction.png'
import { IBaseGameObject } from '../../../types'
import { BaseBuild } from '../base'

export class Castle extends BaseBuild {
  private readonly textLabel: Text = new Text({ text: '0' })

  constructor({ game }: IBaseGameObject) {
    super({ game })

    this.addChild(this.textLabel)
  }

  updateText(text: string) {
    this.textLabel.text = text
  }

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
