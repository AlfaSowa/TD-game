import { Component } from '../../../engine/ecs/components'
import { AbilitiesIds } from '../../configs'

export class AbilitiesComponent implements Component {
  abilityIds: AbilitiesIds[] = []

  constructor(abilityIds: AbilitiesIds[]) {
    this.abilityIds = abilityIds
  }
}
