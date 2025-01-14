import { Container, Text, TextStyle } from 'pixi.js'
import { delayToCallback } from '../utils'

interface IIntervalTicker {
  value: number
  amount: number
  container: Container
}

export class IntervalTicker extends Container {
  private currentValue: number
  private currentAmount: number

  private text: Text
  private isAnimation: boolean = false

  startYPosition: number = 0

  container: Container

  constructor({ value, amount, container }: IIntervalTicker) {
    super()

    this.currentValue = value
    this.currentAmount = amount

    this.container = container

    const style = new TextStyle({ fontSize: 16 })

    this.text = new Text({ text: value, style })

    container.addChild(this)
    this.addChild(this.text)

    this.startYPosition = this.parent.height / 2 - this.text.height / 2
    this.text.x = this.parent.width / 2 - this.text.width / 2
    this.text.y = this.startYPosition
  }

  set value(value: number) {
    this.currentValue = value
  }

  get amount() {
    return this.currentAmount
  }

  tick = delayToCallback(7, 1000, () => {
    this.currentAmount += this.currentValue
    this.isAnimation = true
  })

  animation() {
    if (this.isAnimation) {
      this.text.y = this.text.y - 0.3

      if (this.text.y < -50) {
        this.isAnimation = false
        this.text.y = this.startYPosition
      }
    }
  }

  update() {
    this.animation()
    this.tick()
  }
}
