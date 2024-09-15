import { OPEN_CASTLE_MENU } from '../../constants'
import { events } from '../../core'
import { Game } from '../../game'
import { Castle } from '../../objects'
import { ICastleService } from '../types'

export class CastleService implements ICastleService {
  game: Game
  castle!: Castle

  isShowCastleMenu: boolean = false

  constructor(game: Game) {
    this.game = game

    events.on(OPEN_CASTLE_MENU, this, (isShow: boolean) => {
      this.isShowCastleMenu = isShow
    })
  }

  init() {
    this.castle = new Castle({ game: this.game })
    this.castle.init()
  }

  update() {
    this.castle.update()
  }
}
