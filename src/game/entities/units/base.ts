import { Container } from 'pixi.js'
import { TAIL_SIZE } from '../../constants'

export class BaseUnit extends Container {
  velocity: number = 3
  size: number = TAIL_SIZE

  stepByPath() {}

  moveToTargetByPath() {}
}
