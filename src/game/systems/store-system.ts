import { Build } from '../../shared/api/data-contracts'
import { Game } from '../game'
import { BuildingsStore } from '../store'
import { BaseStoreI, StoreClass } from '../store/base'
import { System } from './types'

export class StoreSystem implements System {
  public static SYSTEM_ID = 'store'
  game!: Game

  public readonly allStores: Map<string, System> = new Map()

  public add<T, S extends BaseStoreI<T> = BaseStoreI<T>>(Class: StoreClass<S>): S {
    const name = Class.STORE_ID

    if (this.allStores.has(name)) {
      return this.allStores.get(name) as S
    }

    const store = new Class()
    store.game = this.game

    this.allStores.set(Class.STORE_ID, store)

    return new Class()
  }

  public get<S>(Class: StoreClass<S>): S {
    return this.allStores.get(Class.STORE_ID) as S
  }

  init() {
    this.add<Build>(BuildingsStore)
  }
}
