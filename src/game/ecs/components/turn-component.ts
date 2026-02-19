import { Component } from '../../../engine/ecs/components'
import { Entity } from '../../../engine/ecs/entities'

export class TurnComponent implements Component {
  btnPressed: boolean = false

  attacker: Entity | null = null
  defender: Entity | null = null
}
