import { Vector2 } from '../../utils'
import { Game } from '../game'

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

export interface IBaseGameObject {
  game: Game
}
