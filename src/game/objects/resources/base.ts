import { BaseGameObject } from '../baseObject'

export class BaseResources extends BaseGameObject {
  private resources: number = 100

  public takeResources(value: number) {
    this.resources -= value
    if (this.resources < 0) {
      this.destroy()
    }
  }

  update() {}
}
