import { Component } from '../../../engine/ecs/components'

export class HealthComponent implements Component {
  currentHealth: number = 0
  maxHealth: number = 0

  constructor(health: number) {
    this.maxHealth = health
    this.currentHealth = health
  }
}
