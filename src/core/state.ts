import { Game } from '../game'
import { FarmSystem } from '../game/systems'

type FarmDataType = {
  id: string
  data: any[]
}

class State {
  private game!: Game
  private innerUserData: string = ''
  private user: any = {}
  private farm!: FarmDataType

  init(game: Game) {
    this.game = game
  }

  set updateFarm(data: any) {
    this.farm = data
    this.game.systems.get(FarmSystem).signals.onCreateDateFarm.emit()
  }

  set updateTilesInFarm(data: any[]) {
    this.farm.data = this.farm.data.map((tile) => {
      const updatedTile = data.find((e: any) => e.id === tile.id)
      if (updatedTile) {
        return updatedTile
      }
      return tile
    })

    this.game.systems.get(FarmSystem).signals.onUpdateDateFarm.emit(data)
  }

  get getFarmData() {
    return this.farm
  }

  set updateInnerUserData(data: string) {
    this.innerUserData = data
  }

  get getInnerUserData() {
    return this.innerUserData
  }
}

export const state = new State()
