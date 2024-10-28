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
      console.log('getFarmByUser', data)

      state.updateFarm = data
    })
  }

  async updateFarmTilesFx(id: string) {
    return await updateFarmTiles(id).then((data) => {
      if (data) {
        state.updateTilesInFarm = data
      }
    })
  }

  notify(sender: object, event: string): void {
    throw new Error('Method not implemented.')
  }
}
