import { Application, Container } from 'pixi.js'
import { Engine, Scene } from '../../engine/core'
import { UiBox, UiSlot } from '../../engine/ui'
import { drawSquareFields } from '../../engine/utils'
import { Vector2 } from '../../utils'

export class MainMenuScene extends Scene {
  uiBox!: UiBox

  init(app: Application, engine: Engine, isViewport?: boolean): void {
    super.init(app, engine, isViewport)

    this.uiBox = this.engine.uiManager.add(new UiBox(new Vector2(30, 30)))

    const container1 = new Container()
    drawSquareFields({
      container: container1,
      fieldSize: 50,
      xAmount: 5,
      yAmount: 5,
      gap: 5,
      renderElementFx: () => this.renderField()
    })

    const container2 = new Container()
    drawSquareFields({
      container: container2,
      fieldSize: 50,
      xAmount: 2,
      yAmount: 8,
      gap: 5,
      renderElementFx: () => this.renderField()
    })

    container1.position.set(10, 10)
    container2.position.set(container1.width + 130, 10)

    this.uiBox.addContainer(container1)
    this.uiBox.addContainer(container2)

    this.uiBox.resize()
  }

  renderField() {
    const slot = new UiSlot(50, 50)

    slot.clicked((f) => {
      console.log(f)
    })

    return slot
  }

  onLoad() {
    this.engine.uiManager.load(this.uiBox)
  }

  onUnLoad() {
    console.log(123)

    this.engine.uiManager.removeFromStage(this.uiBox)
  }
}
