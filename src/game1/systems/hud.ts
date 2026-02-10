import { Container } from 'pixi.js'
import { Signal } from 'typed-signals'
import { findInstance } from '../../utils'
import { Game } from '../game'
import { Modal } from '../helpers'
import { ScreensSystem, ScreensType } from '../screens'
import { System } from './types'

export class HudSystem implements System {
  public static SYSTEM_ID = 'hud'

  game!: Game

  view = new Container()
  modal!: Modal

  public signals = {
    onCreateModal: new Signal<(content: Container) => void>(),
    onDestroyModal: new Signal<() => void>()
  }

  constructor() {
    this.signals.onDestroyModal.connect(() => {
      console.log('hud-system-onDestroyModal')
      this.updateViewPositio()
      this.game.systems.get(ScreensSystem).signals.onViewportResumeDrag.emit()
    })

    this.signals.onCreateModal.connect((content) => {
      console.log('hud-system-onOpenModal')

      if (!findInstance(this.view, Modal)) {
        // const g = new Graphics().rect(0, 0, 100, 50).fill({ color: 'red' })

        // this.modal.addHeader(g)
        this.modal.addContent(content)

        const activeContainer = this.game.systems.get(ScreensSystem).getActiveContainer()
        const currentScreen = this.game.systems.get(ScreensSystem).getCurrentScreen()

        this.game.systems
          .get(ScreensSystem)
          .addContainer(this.modal, currentScreen.SCREEN_NAME as ScreensType, activeContainer.children.length)

        this.game.systems.get(ScreensSystem).signals.onViewportPauseDrag.emit()
        this.game.systems.get(ScreensSystem).signals.onFollowViewportToTarget.emit()

        this.updateViewPositio()
      }
    })
  }

  updateViewPositio() {
    if (this.view.parent) {
      this.view.position.set(
        this.view.parent.width / 2 - this.view.width / 2,
        this.view.parent.height / 2 - this.view.height / 2
      )
    }

    if (this.modal.parent) {
      this.modal.position.set(
        this.modal.parent.width / 2 - this.modal.width / 2,
        this.modal.parent.height / 2 - this.modal.height / 2
      )
    }
  }

  openModal() {}

  init() {
    this.modal = new Modal(this.game)
  }
}
