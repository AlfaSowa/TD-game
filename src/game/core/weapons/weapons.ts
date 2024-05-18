import { Container } from 'pixi.js'

import { MultyGun } from './multy-gun'
import { Game } from '../..'

interface IWeapons {
  game: Game
}

export class Weapons extends Container {
  game: Game

  constructor({ game }: IWeapons) {
    super()

    this.game = game

    this.addChild(new MultyGun({ game: this.game }))
  }

  update() {
    for (let i = 0; i < this.children.length; i++) {
      ;(this.children[i] as MultyGun).update()
    }
  }
}
