import { Game } from '../../../game'

import { BaseGameObject } from '../baseObject'

interface IBaseBuild {
  game: Game
}
export class BaseBuild extends BaseGameObject {
  game: Game

  private currentResources: number = 0
  private maxResources: number = 1000

  constructor({ game }: IBaseBuild) {
    super()
    this.game = game
  }

  public putResources(value: number) {
    if (this.currentResources + value <= this.maxResources) {
      this.currentResources += value
      return 0
    }
    return value
  }

  update() {}
}
