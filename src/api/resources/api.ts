export type CoreResource = {
  quantityPerSecond?: number
  id: string
  name: string
  alias: string
  value: number
}

//TODO перенести в  FetchDataSystem
export const getAllCoreResources = (): Promise<CoreResource[]> => {
  return Promise.resolve([
    {
      id: '1',
      name: 'Золото',
      alias: 'gold',
      quantityPerSecond: 100,
      value: 0
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
  ])
}
