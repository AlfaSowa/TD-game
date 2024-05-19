import { Graphics } from 'pixi.js'
import { Game } from '../../../game'
import { BaseBuild } from './base'
import { colorTheme } from '../../constants'
import { Sawmill } from './sawmill'

interface ICastle {
  game: Game
}

export class Castle extends BaseBuild {
  radius: number = 10
  buildings: BaseBuild[] = []

  constructor({ game }: ICastle) {
    super({ game, radius: 10 })

    this.position.set(game.scene.app.canvas.width / 2, game.scene.app.canvas.height / 2)

    this.addChild(new Graphics().circle(0, 0, this.radius).fill(colorTheme.primary))
    this.addChild(new Sawmill({ game }))
  }

  update() {
    for (const container of this.children) {
      if (container instanceof Sawmill) {
        container.update()
      }
    }
  }
}
