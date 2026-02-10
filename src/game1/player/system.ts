import { Game } from '../game'
import { EntitiesRenderSystem, FetchDataSystem, System } from '../systems'
import { Player } from './player'

export class PlayerSystem implements System {
  public static SYSTEM_ID = 'player-system'

  game!: Game

  private player!: Player

  init() {
    this.player = new Player({ game: this.game })
    this.player.init()

    this.fetchPlayerData()
  }

  fetchPlayerData() {
    const playerData = this.game.systems.get(FetchDataSystem).playerData

    if (playerData) {
      for (const rawSpell of playerData.spells) {
        const spell = this.game.systems.get(EntitiesRenderSystem).createSpellByAlias(rawSpell?.name)

        if (spell) {
          this.player.spells.push(spell)
        }
      }
    }
  }

  getPlayer() {
    return this.player
  }
}
