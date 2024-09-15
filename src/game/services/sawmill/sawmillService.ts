import { Game } from '../../game'
import { Sawmill } from '../../objects/buildings/sawmill'
import { ISawmillService } from '../types'

export class SawmillService implements ISawmillService {
  game: Game
  sawmill!: Sawmill

  constructor(game: Game) {
    this.game = game
  }

  init() {
    this.sawmill = new Sawmill({ game: this.game })
    this.sawmill.init()
  }

  update() {
    this.sawmill.update()
  }
}
