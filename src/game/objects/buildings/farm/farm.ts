import { BaseBuild } from '../base'

export class Farm extends BaseBuild {
  gap: number = 2

  init() {
    this.position.set(20, 20)
  }

  update() {}
}
