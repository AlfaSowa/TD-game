import { Signal } from 'typed-signals'
import { CoreResource, getAllCoreResources } from '../../api'
import { Game } from '../game'
import { System } from './types'

export class ResourcesSystem implements System {
  public static SYSTEM_ID = 'resources'
  game!: Game

  _resources: CoreResource[] = []

  public signals = {
    setResources: new Signal<(resources: CoreResource[]) => void>(),
    onUpdateResource: new Signal<(resources: { value: number; alias: 'wood' | 'gold' }) => void>()
  }

  constructor() {
    this.signals.onUpdateResource.connect((resource) => {
      this._resources = this._resources.map((e) => {
        if (e.alias === resource.alias && resource.value) {
          return { ...e, value: e.value + resource.value }
        }
        return e
      })

      //TODO добавить отправку запроса для сохранения ресурсов
      this.signals.setResources.emit(this._resources)
    })
  }

  async getAllResources() {
    await getAllCoreResources().then((data) => {
      this._resources = data

      this.signals.setResources.emit(this._resources)
    })
  }

  get resources() {
    return this._resources
  }
}
