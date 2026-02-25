import { Component } from '../../../engine/ecs/components'
import { Entity } from '../../../engine/ecs/entities'
import { AbilitiesIds } from '../../configs'

export class ActionIntentComponent implements Component {
  caster?: Entity
  abilityId?: AbilitiesIds
  target?: Entity
}
