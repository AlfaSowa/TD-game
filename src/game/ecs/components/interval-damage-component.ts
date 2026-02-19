import { Component } from '../../../engine/ecs/components'

type IntervalDamageComponentConstructor = {
  duration: number
  damagePerTick: number
  interval: number
}

const SECONDS = 100
export class IntervalDamageComponent implements Component {
  duration: number = 0
  damagePerTick: number = 0

  interval: number = 0
  elapsed: number = 0

  timeLeft: number = 0

  constructor({ duration, damagePerTick, interval }: IntervalDamageComponentConstructor) {
    this.duration = duration * SECONDS
    this.damagePerTick = damagePerTick
    this.interval = interval * SECONDS

    this.timeLeft = this.duration
    this.elapsed = this.interval
  }
}
