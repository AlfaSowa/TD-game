import { Vector2 } from '../utils'

export type CoreBaseConstructorType = {
  ctx: CanvasRenderingContext2D
}

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

export type MoveMovesKeys = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD'
export type SpellsKeys = 'KeyQ' | 'KeyE'
