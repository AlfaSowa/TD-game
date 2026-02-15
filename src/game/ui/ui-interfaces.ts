import { BitmapText } from 'pixi.js'
import { Engine } from '../../engine/core'
import { UiBox, UiSlot } from '../../engine/ui'
import { Vector2 } from '../../utils'
import { DungeonScene } from '../scenes/dungeon-scene'

const BUTTONS_HEIGHT = 50
const GAP = 20
export class UiInterfaces {
  static crateMainMenuInteface(engine: Engine): UiBox {
    const uiBox = engine.uiManager.add(new UiBox(new Vector2(0, 0), 'rgba(0, 0, 0, 0)'))

    //первая кнопка меню
    const startBtnText = new BitmapText({
      text: 'Старт!',
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 'rgb(14, 14, 14)'
      }
    })

    const startBtnSlot = new UiSlot(engine.app.canvas.width - 60, BUTTONS_HEIGHT, 'rgba(101, 101, 101, 0.7)')

    startBtnSlot.clicked((f) => {
      console.log(f)
      console.log(this)

      engine.sceneManager.loadScene(DungeonScene)
    })

    startBtnText.position.x = startBtnSlot.width / 2 - startBtnText.width / 2
    startBtnText.position.y = startBtnSlot.height / 2 - startBtnText.height / 2

    startBtnSlot.addChild(startBtnText)

    //вторая кнопка меню
    const optionsBtnText = new BitmapText({
      text: 'Настройки',
      style: {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 'rgb(14, 14, 14)'
      }
    })

    const optionsBtnSlot = new UiSlot(engine.app.canvas.width - 60, BUTTONS_HEIGHT, 'rgba(101, 101, 101, 0.5)')
    optionsBtnSlot.position.y = BUTTONS_HEIGHT + GAP

    optionsBtnSlot.clicked((f) => {
      console.log(f)
      console.log(this)
    })

    optionsBtnText.position.x = optionsBtnSlot.width / 2 - optionsBtnText.width / 2
    optionsBtnText.position.y = optionsBtnSlot.height / 2 - optionsBtnText.height / 2

    optionsBtnSlot.addChild(optionsBtnText)

    uiBox.addContainer(startBtnSlot)
    uiBox.addContainer(optionsBtnSlot)

    uiBox.view.position.set(engine.app.canvas.width / 2 - uiBox.view.width / 2, 200)

    uiBox.resize()

    return uiBox
  }
}
