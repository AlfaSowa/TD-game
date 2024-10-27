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

  set updateFarmData(data: any) {
    this.farm = data
    this.game.systems.get(FarmSystem).signals.onUpdateDateFarm.emit()
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
