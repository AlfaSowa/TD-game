import { BaseGameObject } from '../baseObject'

export class BaseResource extends BaseGameObject {
  private value: number = 0

  setValue(value: number) {
    this.value = value
  }
}
