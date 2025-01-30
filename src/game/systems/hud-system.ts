import { Container, Graphics } from 'pixi.js'
import { Signal } from 'typed-signals'
import { findInstance } from '../../utils'
import { Game } from '../game'
import { Modal } from '../helpers'
import { ScreensSystem } from './screens-system'
import { System } from './types'

export class HudSystem implements System {
  public static SYSTEM_ID = 'hud'

  game!: Game

  view = new Container()
  modalContainer!: Modal

  public signals = {
    onCreateModal: new Signal<(content: Container) => void>(),
    onDestroyModal: new Signal<() => void>()
  }

  updateViewPositio() {
    if (this.view.parent) {
      this.view.position.set(
        this.view.parent.width / 2 - this.view.width / 2,
        this.view.parent.height / 2 - this.view.height / 2
      )
    }

    if (this.modalContainer.parent) {
      this.modalContainer.position.set(
        this.modalContainer.parent.width / 2 - this.modalContainer.width / 2,
        this.modalContainer.parent.height / 2 - this.modalContainer.height / 2
      )
    }
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
        const g = new Graphics().rect(0, 0, 100, 50).fill({ color: 'red' })

        this.modalContainer.addHeader(g)
        this.modalContainer.addContent(content)

        const activeContainer = this.game.systems.get(ScreensSystem).getActiveContainer()

        this.game.systems.get(ScreensSystem).addContainer(this.modalContainer, 'map', activeContainer.children.length)

        this.game.systems.get(ScreensSystem).signals.onViewportPauseDrag.emit()
        this.game.systems.get(ScreensSystem).signals.onFollowViewportToTarget.emit()

        this.updateViewPositio()
      }
    })
  }

  init() {
    this.game.systems.get(ScreensSystem).addContainer(this.view, 'map')

    this.modalContainer = new Modal(this.game)
    this.modalContainer.init()

    const g = new Graphics().rect(0, 0, 300, 300).fill({ color: '#f1f1f1' })
    const gm = new Graphics().rect(0, 0, 300, 300).fill({ color: '#d80d0d' })

    g.eventMode = 'static'
    g.cursor = 'pointer'

    g.on('pointerup', () => {
      console.log('hud-system-pointerup')
      this.signals.onCreateModal.emit(gm)
    })

    this.view.addChild(g)

    this.updateViewPositio()
  }
}
