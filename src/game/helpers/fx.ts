import { Container, Graphics } from 'pixi.js'

export const drawSquareFields = <F, T extends Container>({
  fieldsArray,
  pWidth,
  renderContainer,
  squareSize,
  xAmount,
  yAmount,
  postRender
}: {
  fieldsArray: F[]
  squareSize: number
  pWidth: number
  renderContainer: (field: F) => T
  postRender: (elem: T, field: F) => void
  xAmount: number
  yAmount?: number
}): Container[] => {
  let fields: Container[] = []

  for (let i = 0; i < (yAmount ? yAmount * xAmount : xAmount * xAmount); i++) {
    const g = new Graphics().rect(0, 0, squareSize, squareSize).fill({ color: '#f1f1f1' }).stroke(0x00ff00)

    //TODO  подумать как сделать чтобы Graphics отрисовывалась вперед container
    const container = renderContainer(fieldsArray[i])

    container.addChild(g)

    container.position.set((i % xAmount) * pWidth, Math.floor(i / (yAmount || xAmount)) * pWidth)

    postRender(container, fieldsArray[i])

    fields.push(container)
  }

  return fields
}
