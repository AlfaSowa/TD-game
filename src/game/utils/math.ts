import { Container } from 'pixi.js'
import { Vector2 } from './helpers'
import { MouseType, TargetType } from '../types'

//---isOnCanavasField ---//
type IsOnCanavasFieldProps = {
  position: Vector2
  radius: number
  ctx: CanvasRenderingContext2D
}

export const isOnCanavasField = ({ radius, position, ctx }: IsOnCanavasFieldProps): boolean => {
  return (
    position.x >= radius &&
    position.x <= ctx.canvas.width - radius &&
    position.y >= radius &&
    position.y <= ctx.canvas.height - radius
  )
}

//--getDistBetweenTargets--//
export const getDistBetweenTargets = (targetA: TargetType, targetB: TargetType): number => {
  let delta = {
    x: targetA.position.x - targetB.position.x,
    y: targetA.position.y - targetB.position.y
  }

  return Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2))
}

//--isTargetsColision--//
export const isTargetsColision = (targetA: TargetType, targetB: TargetType): boolean => {
  return getDistBetweenTargets(targetA, targetB) < targetA.radius + targetB.radius
}

//--isTargetsRectColision--//
type TargetSizeType = { width: number; height: number }

export const IsTargetsRectColision = (
  targetA: TargetType & TargetSizeType,
  targetB: TargetType & TargetSizeType
): boolean => {
  if (
    targetA.position.x + targetA.width >= targetB.position.x &&
    targetA.position.x <= targetB.position.x + targetB.width &&
    targetA.position.y + targetA.height >= targetB.position.y &&
    targetA.position.y <= targetB.position.y + targetB.height
  ) {
    return true
  }

  return false
}

//--isMouseOnRectTarget--//
type IsMouseOnRectTargetType = {
  mouse: MouseType
  target: any
}

export const isMouseOnRectTarget = ({ mouse, target }: IsMouseOnRectTargetType): boolean => {
  return (
    mouse.x > target.position.x &&
    mouse.x < target.position.x + target.width &&
    mouse.y > target.position.y &&
    mouse.y < target.position.y + target.height
  )
}

//--isMouseOnCircleTarget--//
type IsMouseOnCircleTargetType = {
  mouse: MouseType
  target: any
}

export const isMouseOnCircleTarget = ({ mouse, target }: IsMouseOnCircleTargetType): boolean => {
  return (
    mouse.x > target.position.x - target.radius &&
    mouse.x < target.position.x + target.radius &&
    mouse.y > target.position.y - target.radius &&
    mouse.y < target.position.y + target.radius
  )
}

//--moveElementToTarget--//

type B = Container & { velocity: number }

export const moveElementToTarget = (element: Container, target: Container, velocity: number = 1) => {
  if (element.x !== target.x || element.y !== target.y) {
    let delta = {
      x: target.x - element.x,
      y: target.y - element.y
    }

    let angle = Math.atan2(delta.y, delta.x)

    element.x += Math.cos(angle) * velocity
    element.y += Math.sin(angle) * velocity
  }
}

//--setMousePosition--//
export const setMousePosition = (bild: any, { offsetX, offsetY }: MouseEvent) => {
  ;[bild.mouse.x, bild.mouse.y] = [offsetX, offsetY]
}

//--randomNumber--//
export const randomNumber = ([max, min]: number[]): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//--unitMovement--//
export const unitMovement = (build: any, bounds: number = 0) => {
  if (
    isOnCanavasField({
      ctx: build.ctx,
      radius: build.radius,
      position: build.position
    })
  ) {
    if (build.KeyD) {
      build.position.x += build.velocity
    }
    if (build.KeyS) {
      build.position.y += build.velocity
    }
    if (build.KeyA) {
      build.position.x -= build.velocity
    }
    if (build.KeyW) {
      build.position.y -= build.velocity
    }
  }

  if (build.position.x < build.radius + build.velocity + bounds) {
    build.position.x = build.radius + build.velocity + bounds
  }
  if (build.position.x > build.ctx.canvas.width - (build.radius + build.velocity) - bounds) {
    build.position.x = build.ctx.canvas.width - (build.radius + build.velocity) - bounds
  }
  if (build.position.y < build.radius + build.velocity + bounds) {
    build.position.y = build.radius + build.velocity + bounds
  }
  if (build.position.y > build.ctx.canvas.height - (build.radius + build.velocity) - bounds) {
    build.position.y = build.ctx.canvas.height - (build.radius + build.velocity) - bounds
  }
}

//--getNearestTarget--//
export const getNearestTarget = <E, T>(entity: E, targets: T[]): [T, number] => {
  let distToNearestTarget: number = 99999
  let nearestTarget = targets[0]

  for (let i = 0; i < targets.length; i++) {
    const dist = getDistBetweenTargets(entity as TargetType, targets[i] as TargetType)

    if (dist < distToNearestTarget) {
      distToNearestTarget = dist
      nearestTarget = targets[i]
    }
  }

  return [nearestTarget, distToNearestTarget]
}