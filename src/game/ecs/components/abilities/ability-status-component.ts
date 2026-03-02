import { Effect, EffectType } from '../../../configs'
import { EffectTagComponent } from './effect-tag-component'

export class AbilityStatusComponent extends EffectTagComponent {
  value: number = 0
  duration: number = 0
  type: EffectType

  constructor(effect: Effect) {
    super()
    this.duration = effect.duration
    this.type = effect.type
    this.value = effect.amount
  }
}
