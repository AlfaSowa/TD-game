import { Signal } from 'typed-signals'
import { CoreResource } from '../../../api'
import { Game } from '../../game'
import { System } from '../../systems'

export class ResourcesSystem implements System {
  public static SYSTEM_ID = 'resources-system'
  game!: Game

  _resources: CoreResource[] = []

  public signals = {
    setResources: new Signal<(resources: CoreResource[]) => void>(),
    onUpdateResource: new Signal<
      (resources: { value: number; alias: string }[], type: 'increase' | 'decrease') => void
    >()
  }

  constructor() {
    this.signals.onUpdateResource.connect((resources, type) => {
      this._resources = this._resources.map((e) => {
        const updatedResource = resources.find((i) => i.alias === e.alias)

        if (updatedResource) {
          return {
            ...e,
            value: type === 'increase' ? e.value + updatedResource.value : e.value - updatedResource.value
          }
        }

        return e
      })

      //TODO добавить отправку запроса для сохранения ресурсов
      this.signals.setResources.emit(this._resources)
    })
  }

  init() {
    this.signals.setResources.emit(this._resources)
  }

  set resources(value: CoreResource[]) {
    this._resources = value
  }

  get resources() {
    return this._resources
  }

  //провереям всех ли ресурсов хватает на апгрейд
  checkResourcesToPay(resources: { [key: string]: number }) {
    return this._resources.every((element) => {
      return element.value >= resources[element.alias]
    })
  }
}
