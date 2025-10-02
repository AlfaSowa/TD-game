import { Container } from 'pixi.js'
import { Game } from '../game'

interface IBaseSpell {
  init?: () => void
  update?: () => void
}

interface BaseSpellConstructor {
  game: Game
}

export class BaseSpell extends Container implements IBaseSpell {
  game: Game

  constructor({ game }: BaseSpellConstructor) {
    super()
    this.game = game
  }

  init() {}
  update() {}
}
