import { Vector3 } from '../../utils'
import { Component } from './component'

export class PositionComponent implements Component {
  position!: Vector3

  constructor(position: Vector3) {
    this.position = position
  }
}
