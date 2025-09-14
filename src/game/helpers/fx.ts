import { Container, Graphics } from 'pixi.js'
import { FieldType } from '../dungeon/field'

export const drawSquareFields = <T extends Container>({
  fieldsArray,
  pWidth,
  renderContainer,
  squareSize,
  xAmount,
  yAmount
}: {
  fieldsArray: FieldType[]
  squareSize: number
  pWidth: number
  renderContainer: (field: any) => T
  xAmount: number
  yAmount?: number
}): Container[] => {
  let fields: Container[] = []

  for (let i = 0; i < (yAmount ? yAmount * xAmount : xAmount * xAmount); i++) {
    const g = new Graphics().rect(0, 0, squareSize, squareSize).fill({ color: '#f1f1f1' }).stroke(0x00ff00)

    //TODO  подумать как сделать чтобы Graphics отрисовывалась вперед container
    const container = renderContainer(fieldsArray[i])

    container.addChildAt(g, 0)

    container.position.set((i % xAmount) * pWidth, Math.floor(i / (yAmount || xAmount)) * pWidth)

    fields.push(container)
  }

  return fields
}
