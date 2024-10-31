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
  private farmData!: FarmDataType

  init(game: Game) {
    this.game = game
  }

  set initFarm(data: any) {
    this.farmData = data
    this.game.systems.get(FarmSystem).signals.onInitFarm.emit()
  }

  set updateFarm(data: any[]) {
    this.farmData.data = data
    this.game.systems.get(FarmSystem).signals.onUpdateFarm.emit()
  }

  get farm() {
    return this.farmData
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
