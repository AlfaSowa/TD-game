import { Container } from 'pixi.js'
import { Game } from '../..'

interface IWeaponBase {
  game: Game
}

export class WeaponBase extends Container {
  game: Game

  constructor({ game }: IWeaponBase) {
    super()
    this.game = game
  }
}
