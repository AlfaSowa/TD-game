import { Container } from 'pixi.js'

interface IBaseAbility {
  init?: () => void
  update?: () => void
}

export class BaseAbility extends Container implements IBaseAbility {
  update() {}
}
