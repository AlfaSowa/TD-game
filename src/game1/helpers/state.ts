import { Game } from '../game'

type FarmDataType = {
  id: string
  data: any[]
}

class State {
  private game!: Game

  private innerUserData: string = ''
  private user: any = {
    gold: 0
  }

  private farmData!: FarmDataType

  init(game: Game) {
    this.game = game
  }

  set initFarm(data: any) {
    this.farmData = data
  }

  set updateFarm(data: any[]) {
    this.farmData.data = data
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

  set updateUserGold(value: number) {
    this.user.gold = value
  }

  get getUserGold() {
    return this.user.gold
  }
}

export const state = new State()
