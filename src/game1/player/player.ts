import { Container } from 'pixi.js'
import { BaseSpell } from '../entities'
import { Game } from '../game'

export interface PlayerConstructor {
  game: Game
}

export class Player extends Container {
  damage: number = 7
  hp: number = 150

  game: Game

  spells: BaseSpell[] = []

  constructor({ game }: PlayerConstructor) {
    super()
    this.game = game
  }

  init() {
    console.log('Player init')
  }
}
