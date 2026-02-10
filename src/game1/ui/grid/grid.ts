import { Container } from 'pixi.js'
import { drawSquareFields } from '../../helpers'

export class Grid extends Container {
  init(renderElementFx: () => Container, fieldSize: number, xAmount: number, yAmount?: number) {
    drawSquareFields({
      container: this,
      fieldSize: fieldSize,
      xAmount: xAmount,
      yAmount: yAmount || xAmount,
      renderElementFx: renderElementFx
    })
  }
}
