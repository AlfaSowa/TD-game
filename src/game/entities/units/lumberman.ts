import { BaseGameObject } from '../baseObject'

import { Collector } from './collector'

export class Lumberman extends Collector {
  init(target: BaseGameObject, store: BaseGameObject) {
    this.setTarget(target)
    this.setStore(store)
  }

  update() {
    super.update()
  }
}
