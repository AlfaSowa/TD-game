import { Assets, Sprite } from 'pixi.js'
import { Game } from '../../..'
import CastleImage from '../../../../assets/images/Castle_Blue.png'
import { ScreensSystem } from '../../../systems'
import { BaseMapObject } from '../base'

export class City extends BaseMapObject {
  constructor({ game }: { game: Game }) {
    super({ game })

    this.eventMode = 'static'
    this.cursor = 'pointer'

    this.on('pointerup', (e) => {
      this.game.systems.get(ScreensSystem).signals.onToggleScreen.emit('possession')
    })
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
