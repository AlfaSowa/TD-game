import { getBuildingsDictionary } from '../../api'
import { Build } from '../../shared/api/data-contracts'
import { Game } from '../game'
import { BaseStoreI } from './base'

export class BuildingsStore implements BaseStoreI<Build> {
  dataStore!: Build
  game?: Game

  public static STORE_ID = 'buildings'

  async getData() {
    await getBuildingsDictionary().then((data) => {
      this.dataStore = data
    })
  }

  get data() {
    return this.dataStore
  }
}
