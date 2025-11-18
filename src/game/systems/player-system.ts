import { Game } from '../game'
import { Player } from '../player'
import { System } from './types'

export class PlayerSystem implements System {
  public static SYSTEM_ID = 'player-system'

  game!: Game

  private player!: Player

  init() {
    this.player = new Player({ game: this.game })
    this.player.init()
  }

  fetchPlayerData() {
    console.log('fetchPlayerData')
  }

  getPlayer() {
    return this.player
  }
}
