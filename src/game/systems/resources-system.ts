import { Signal } from 'typed-signals'
import { CoreResource, getAllCoreResources } from '../../api'
import { Game } from '../game'
import { System } from './types'

export class ResourcesSystem implements System {
  public static SYSTEM_ID = 'resources'
  game!: Game

  _resources: CoreResource[] = []

  public signals = {
    onGetResources: new Signal<(resource: { value: number; alias: 'wood' | 'gold' }) => void>()
  }

  private async getAllResources() {
    await getAllCoreResources().then((data) => {
      console.log('ResourcesSystem', data)
      this._resources = data
    })
  }

  get resources() {
    return this._resources
  }

  init() {
    this.getAllResources()
  }
}
