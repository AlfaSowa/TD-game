import { Component } from '../../../engine/ecs/components'

export class HealthComponent implements Component {
  health: number = 0

  constructor(health: number) {
    this.health = health
  }
}
