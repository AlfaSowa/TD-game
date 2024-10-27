import { Game } from '../../../game'
import { BaseBuild } from '../base'

interface IFarm {
  game: Game
}

export class Farm extends BaseBuild {
  gap: number = 2

  constructor({ game }: IFarm) {
    super({ game })

    this.position.set(game.app.canvas.width / 2 - this.width / 2, game.app.canvas.height / 2 - this.height / 2)
  }

  update() {}
}
