import { Game } from '../game'
import { EntitiesRenderSystem } from './entities-render-system'
import { ResourcesSystem } from './resources-system'
import { System } from './types'

export class FetchDataSystem implements System {
  public static SYSTEM_ID = 'fetch-data-system'
  game!: Game

  async getImportantData() {
    await this.getPossessionData()
    await this.getAllResources()
  }

  private getPossessionData() {
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
        image: 'house_200x200.png',
        position: { x: 400, y: 400 }
      }
    ]).then((data) => {
      this.game.systems.get(EntitiesRenderSystem).possessionData = data
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
