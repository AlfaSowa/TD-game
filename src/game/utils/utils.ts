import { Container } from 'pixi.js'

//--delayToCallback--//
export const delayToCallback = (callback: (args?: any) => any) => {
  let elapsed: number = 0

  return (hold: number, args?: any) => {
    elapsed++

    if (elapsed % hold === 0) {
      elapsed = 0
      callback(args)
    }
  }
}

//--removeElementFromArray--//
export const removeElementFromArray = <T>(array: T[], element: T) => {
  const index = array.indexOf(element)
  if (index > -1) {
    array.splice(index, 1)
  }
}

export const findOContainer = (context: Container, id: number) => {
  return context.children.find((obj) => obj.uid === id)
}
