import { Container } from 'pixi.js'
import { Game } from '../game'

type PlayerAbilities = {
  [key in string]: string
}

type PlayerStats = {
  damage: number
}

interface PlayerConstructor {
  game: Game
}

export class Player extends Container {
  game: Game

  private abilities: PlayerAbilities = {}

  private stats: PlayerStats = {
    damage: 10
  }

  constructor({ game }: PlayerConstructor) {
    super()
    this.game = game
  }

  init() {
    console.log('Player init')
  }
}
