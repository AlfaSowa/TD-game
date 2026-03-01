import { Component } from '../../../../engine/ecs/components'
import { AbilitiesIds } from '../../../configs'

export class AbilityComponent implements Component {
  abilityId: AbilitiesIds

  constructor(abilityId: AbilitiesIds) {
    this.abilityId = abilityId
  }
}
