import { Component } from '../../../../engine/ecs/components'
import { Effect } from '../../../configs'

export class AbilityDamageComponent implements Component {
  value: number = 0

  constructor(effect: Effect) {
    this.value = effect.amount
  }
}
