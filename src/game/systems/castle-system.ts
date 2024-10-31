import { events } from '../../core'
import { OPEN_CASTLE_MENU } from '../constants'

import { Game } from '../game'
import { Castle } from '../objects'
import { System } from './types'

export class CastleSystem implements System {
  public static SYSTEM_ID = 'castle'

  game!: Game

  castle!: Castle

  isShowCastleMenu: boolean = false

  constructor() {
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
