import { getFarm, updateFarmTiles } from '../api'
import { Game } from '../game'
import { state } from './state'

interface IMediator {}

export class Mediator implements IMediator {
  private game: Game

  constructor(game: Game) {
    this.game = game

    this.game.setMediator(this)
  }

  async initFarmFx() {
    return await getFarm().then((data) => {
      state.initFarm = data
    })
  }

  async updateFarmFx(ids: string[]) {
    return await updateFarmTiles(ids).then((data) => {
      if (data) {
        state.updateFarm = data.data
        state.updateUserGold = data.gold

        this.game.signals.onGoldUpdate.emit(data.gold)
      }
    })
  }
}
