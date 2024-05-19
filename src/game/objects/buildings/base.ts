import { Container } from 'pixi.js'
import { Game } from '../../../game'

interface IBaseBuild {
  game: Game
  radius: number
}

export class BaseBuild extends Container {
  game: Game
  radius: number

  constructor({ game, radius }: IBaseBuild) {
    super()

    this.game = game
    this.radius = radius
  }

  update() {}
}
