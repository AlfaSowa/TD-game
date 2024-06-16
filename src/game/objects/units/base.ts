import { TAIL_SIZE } from '../../constants'
import { BaseGameObject } from '../baseObject'

export class BaseUnit extends BaseGameObject {
  velocity: number = 3
  size: number = TAIL_SIZE

  stepByPath() {}

  moveToTargetByPath() {}
}
