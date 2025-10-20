import { Container, Graphics } from 'pixi.js'

type DrawSquareFieldsType = {
  container: Container
  fieldSize: number
  xAmount: number
  yAmount?: number
  renderElementFx?: () => Container
}
export const drawSquareFields = <F, T extends Container>({
  container,
  fieldSize,
  xAmount,
  yAmount,
  renderElementFx
}: DrawSquareFieldsType) => {
  for (let i = 0; i < (yAmount ? yAmount * xAmount : xAmount * xAmount); i++) {
    let field = renderElementFx ? renderElementFx() : new Container()

    if (!renderElementFx) {
      const g = new Graphics().rect(0, 0, fieldSize, fieldSize).fill({ color: '#f1f1f1' }).stroke(0x00ff00)
      field.addChild(g)
    }

    field.position.set((i % xAmount) * fieldSize, Math.floor(i / xAmount) * fieldSize)

    container.addChild(field)
  }
}
