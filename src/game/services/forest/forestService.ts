import { Game } from '../../game'
import { Forest } from '../../objects'
import { IForestService } from '../types'

export class ForestService implements IForestService {
  game: Game
  forest!: Forest

  constructor(game: Game) {
    this.game = game
  }

  init() {
    this.forest = new Forest({ game: this.game })
    this.forest.init()
  }

  update() {
    this.forest.update()
  }
}
