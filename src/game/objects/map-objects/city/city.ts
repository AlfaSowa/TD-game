import { Assets, Sprite, Text } from 'pixi.js'
import { Game } from '../../..'
import CastleImage from '../../../../assets/images/House_Red.png'
import { ScreensSystem } from '../../../systems'
import { BaseMapObject } from '../base'

export class City extends BaseMapObject {
  private readonly textLabel: Text = new Text({ text: '0' })

  constructor({ game }: { game: Game }) {
    super({ game })

    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.addChild(this.textLabel)

    this.on('pointerup', (e) => {
      this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('possession')
    })
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
