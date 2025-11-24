import { Assets, Sprite } from 'pixi.js'
import { BaseBuilding, BaseSpell, BaseUnit, Castle, Cave, FighterUnit, MageUnit, MeleeAttack } from '../entities'
import { Game } from '../game'
import { ScreensSystem, ScreensType } from '../screens'
import { FetchDataSystem } from './fetch-data'
import { System } from './types'

type Buildings = {
  [key: string]: () => BaseBuilding
}

type Units = {
  [key: string]: () => BaseUnit
}

type Spells = {
  [key: string]: () => BaseSpell
}

export class EntitiesRenderSystem implements System {
  public static SYSTEM_ID = 'entities-render-system'

  game!: Game

  private buildings!: Buildings
  private units!: Units
  private spells!: Spells

  init() {
    this.buildings = {
      ['Castle']: () => new Castle({ game: this.game }),
      ['Cave']: () => new Cave({ game: this.game })
    }

    this.units = {
      ['Mage']: () => new MageUnit({ game: this.game }),
      ['Fighter']: () => new FighterUnit({ game: this.game })
    }

    this.spells = {
      ['MeleeAttack']: () => new MeleeAttack({ game: this.game })
    }
  }

  async renderData(container: ScreensType) {
    const buildingsData = this.game.systems.get(FetchDataSystem).buildings

    for (const element of buildingsData) {
      const entity = this.createBuildByAlias(element?.type)

      if (entity && element.container === container) {
        entity.type = element.type
        entity.position.set(element.position.x, element.position.y)

        const sheet = await Assets.loadBundle(['default'])

        const sprite = new Sprite(sheet.default[element.image])

        entity.addChild(sprite)

        this.game.systems.get(ScreensSystem).addContainer(entity, element.container)

        entity.init()
      }
    }
  }

  createBuildByAlias(alias: string) {
    return this.buildings[alias]?.()
  }

  createUnitByAlias(alias: string) {
    return this.units[alias]?.()
  }

  createSpellByAlias(alias: string) {
    return this.spells[alias]?.()
  }
}
