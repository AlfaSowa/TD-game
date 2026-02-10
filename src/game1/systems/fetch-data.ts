import { SpellType } from '../entities'
import { Game } from '../game'
import { ResourcesSystem } from './resources'

import { System } from './types'

type FetchBuildingsDataResolve = {
  type: string
  level?: {
    value: number
    next: {
      wood: number
      gold: number
      stone: number
      food: number
    }
  }
  abilities?: string[]
  image: string
  position: { x: number; y: number }
  container: string
}

type FetchPlayerDataResolve = {
  spells: { type: SpellType; name: string; damage: number }[]
}

export class FetchDataSystem implements System {
  public static SYSTEM_ID = 'fetch-data-system'
  game!: Game

  //TODO переделать на стор
  buildings: FetchBuildingsDataResolve[] = []
  playerData: FetchPlayerDataResolve | null = null

  async getImportantData() {
    await this.fetchBuildingsData()
    await this.getAllResources()
    await this.getPlayerData()
  }

  private getPlayerData() {
    Promise.resolve({
      spells: [{ type: SpellType.MELEE, name: 'MeleeAttack', damage: 10 }]
    }).then((data) => {
      this.playerData = data
    })
  }

  private fetchBuildingsData() {
    Promise.resolve([
      {
        type: 'Castle',
        level: {
          value: 0,
          next: {
            wood: 5,
            gold: 0,
            stone: 0,
            food: 0
          }
        },
        abilities: ['Basic Attack', 'Shield'],
        image: 'images/house_200x200.png',
        position: { x: 400, y: 400 },
        container: 'possession'
      },
      {
        type: 'Cave',
        level: {
          value: 0,
          next: {
            wood: 5,
            gold: 0,
            stone: 0,
            food: 0
          }
        },
        image: 'images/cave_100x100.png',
        position: { x: 450, y: 450 },
        container: 'map'
      }
    ]).then((data) => {
      this.buildings = data
    })
  }

  private getAllResources() {
    Promise.resolve([
      {
        id: '1',
        name: 'Золото',
        alias: 'gold',
        quantityPerSecond: 100,
        value: 4
      },
      {
        id: '2',
        name: 'Дерево',
        alias: 'wood',
        value: 0
      },
      {
        id: '3',
        name: 'Камень',
        alias: 'stone',
        quantityPerSecond: 100,
        value: 0
      },
      {
        id: '4',
        name: 'Еда',
        alias: 'food',
        value: 0
      }
    ]).then((data) => {
      this.game.systems.get(ResourcesSystem).resources = data
    })
  }
}
