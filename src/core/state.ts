import { Game } from '../game'
import { FarmSystem } from '../game/systems'

type FarmDataType = {
  id: string
  data: any[]
}

class State {
  private game!: Game
  private innerUserData: string = ''
  private user: any = {
    coins: 0
  }
  private farm!: FarmDataType

  init(game: Game) {
    this.game = game
  }

  set updateFarm(data: any) {
    this.farm = data
    this.game.systems.get(FarmSystem).signals.onCreateDateFarm.emit()
  }

  set updateTilesInFarm(data: any[]) {
    this.farm.data = data
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

  set updateUserCoins(value: number) {
    this.user.coins = value
  }

  get getUserCoins() {
    return this.user.coins
  }
}

export const state = new State()
