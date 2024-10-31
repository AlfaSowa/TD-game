import { getFarmByUser, updateFarmTiles } from '../api'
import { Game } from '../game'
import { state } from './state'

interface IMediator {
  notify(sender: object, event: string): void
}

export class Mediator implements IMediator {
  private game: Game

  constructor(game: Game) {
    this.game = game

    this.game.setMediator(this)
  }

  async getFarmByUserFx(): Promise<any> {
    return await getFarmByUser().then((data) => {
      state.updateFarm = data
    })
  }

  async updateFarmTilesFx(ids: string[]) {
    return await updateFarmTiles(ids).then((data) => {
      if (data) {
        state.updateTilesInFarm = data.data
        state.updateUserCoins = data.coins
      }
    })
  }

  notify(sender: object, event: string): void {
    throw new Error('Method not implemented.')
  }
}
