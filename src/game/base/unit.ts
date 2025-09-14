import { Container } from 'pixi.js'
import { Game } from '../game'

export interface BaseUnitConstructor {
  game: Game
}

export class BaseUnit extends Container {
  damage: number = 0
  game: Game

  constructor({ game }: BaseUnitConstructor) {
    super()
    this.game = game
  }

  init() {}
}
