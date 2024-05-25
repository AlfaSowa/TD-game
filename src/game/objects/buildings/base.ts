import { Container } from 'pixi.js'
import { Game } from '../../../game'

interface IBaseBuild {
  game: Game
}

export class BaseBuild extends Container {
  game: Game

  constructor({ game }: IBaseBuild) {
    super()
    this.game = game
  }

  update() {}
}
