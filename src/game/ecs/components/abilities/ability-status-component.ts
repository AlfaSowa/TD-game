import { Component } from '../../../../engine/ecs/components'
import { Effect, EffectType } from '../../../configs'

export class AbilityStatusComponent implements Component {
  value: number = 0
  duration: number = 0
  type: EffectType

  constructor(effect: Effect) {
    this.duration = effect.duration
    this.type = effect.type
    this.value = effect.amount
  }
}
