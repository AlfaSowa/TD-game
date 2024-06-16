import { Vector2 } from '../utils'

export type MouseType = {
  x: number
  y: number
  down: boolean
}

export type TargetType = {
  position: Vector2
  radius: number
  width?: number
  height?: number
}

export interface IBaseGameObject {}
