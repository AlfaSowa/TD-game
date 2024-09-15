import { BaseGameObject } from '../baseObject'

export class BaseBuild extends BaseGameObject {
  private currentResources: number = 0
  private maxResources: number = 1000

  public putResources(value: number) {
    if (this.currentResources + value <= this.maxResources) {
      this.currentResources += value
      return 0
    }
    return value
  }

  update() {}
}
