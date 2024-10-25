import { Game } from '../game'
import { Farm } from '../objects'
import { System } from './types'

export class FarmSystem implements System {
  public static SYSTEM_ID = 'farm'

  game!: Game

  farm!: Farm

  constructor() {}

  init() {
    this.farm = new Farm({ game: this.game })
    this.farm.init()
    console.log(this.farm)
  }

  private planted() {
    console.log(12312)
  }

  update() {
    this.farm.update()
  }
}
