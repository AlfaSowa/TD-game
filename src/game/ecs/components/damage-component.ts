import { Component } from '../../../engine/ecs/components'

export class DamageComponent implements Component {
  damage: number = 0

  constructor(damage: number) {
    this.damage = damage
  }
}
