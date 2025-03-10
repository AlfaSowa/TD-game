import { Game } from '../game'

export interface BaseStoreI<T> {
  game?: Game
  dataStore: T

  getData?: () => void
}

export interface StoreClass<STORE> {
  STORE_ID: string

  new (): STORE
}

// export class BaseStore<T> implements BaseStoreI<T> {
//   game: Game
//   dataStore!: T
//   STORE_ID!: string

//   constructor(game: Game) {
//     this.game = game
//   }
// }
