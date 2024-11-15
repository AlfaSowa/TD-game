import { Game } from '../../../game'
import { BaseBuild } from '../base'

interface IFarm {
  game: Game
}

export class Farm extends BaseBuild {
  gap: number = 2

  updateFarmPosition() {
    console.log('updateFarmPositions')

    this.position.set(this.parent.width / 2 - this.width / 2, this.parent.height / 2 - this.height / 2)
  }

  init() {}

  update() {}
}
