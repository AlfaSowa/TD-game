import { Game } from '../game'
import { System } from './types'

export class LevelingSystem implements System {
  public static SYSTEM_ID = 'leveling'
  game!: Game
  private _data!: any

  set data(value: any) {
    this._data = value
  }

  getSystemData(type: string, entity?: string) {
    if (!entity) {
      return this._data[type]
    }

    return this._data[type]?.find((e: any) => e.type === entity)
  }
}
