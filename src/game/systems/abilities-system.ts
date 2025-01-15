import { Container } from 'pixi.js'
import { BaseAbility } from '../abilities'
import { Game } from '../game'
import { System } from './types'

interface AbilitiClass<T> {
  new (...args: any): T
}

export class AbilitiesSystem implements System {
  public static SYSTEM_ID = 'abilities'
  game!: Game

  getAbility(abilityName: string) {
    return new BaseAbility()
  }

  createAbilitiesContainer = (abilitiesNames: string[]): Container => {
    const container = new Container()

    for (const name of abilitiesNames) {
      const ability = this.getAbility(name)
      container.addChild(ability)
    }

    return container
  }
}
