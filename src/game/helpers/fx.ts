import { Container, Graphics } from 'pixi.js'

type DrawSquareFieldsType = {
  container: Container
  NumberOfCols: number
  fieldSize: number
  xAmount: number
  yAmount?: number
}
export const drawSquareFields = <F, T extends Container>({
  container,
  NumberOfCols,
  fieldSize,
  xAmount,
  yAmount
}: DrawSquareFieldsType) => {
  for (let i = 0; i < (yAmount ? yAmount * xAmount : xAmount * xAmount); i++) {
    const field = new Container()
    const g = new Graphics().rect(0, 0, fieldSize, fieldSize).fill({ color: '#f1f1f1' }).stroke(0x00ff00)
    field.addChild(g)

    field.position.set((i % xAmount) * NumberOfCols, Math.floor(i / xAmount) * NumberOfCols)

    container.addChild(field)
  }
}
