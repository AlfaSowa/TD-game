import { Container } from 'pixi.js'

//TODO перепроверить все вызовы
export const getDistBetweenContainers = <A extends Container, B extends Container>(tA: A, tB: B): number => {
  return Math.hypot(tA.x + tA.width / 2 - (tB.x + tB.width / 2), tA.y + tA.height / 2 - (tB.y + tB.height / 2))
}

export const isContainersCollision = <A extends Container, B extends Container>(
  tA: A,
  tB: B,
  distToCollision: number
): boolean => {
  return getDistBetweenContainers(tA, tB) <= distToCollision
}

export const moveContainerToContainer = <A extends Container, B extends Container>(
  tA: A,
  tB: B,
  velocity: number = 1
) => {
  if (tA.x !== tB.x || tA.y !== tB.y) {
    const delta = {
      x: tB.x + tB.width / 2 - tA.x,
      y: tB.y + tB.height / 2 - tA.y
    }

    const angle = Math.atan2(delta.y, delta.x)

    tA.x += Math.cos(angle) * velocity
    tA.y += Math.sin(angle) * velocity
  }
}

export const randomNumber = ([max, min]: number[]): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
