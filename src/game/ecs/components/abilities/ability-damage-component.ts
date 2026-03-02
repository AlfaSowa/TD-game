import { Effect } from '../../../configs'
import { EffectTagComponent } from './effect-tag-component'

export class AbilityDamageComponent extends EffectTagComponent {
  value: number = 0

  constructor(effect: Effect) {
    super()
    this.value = effect.amount
  }
}
