export type CoreResource = {
  quantityPerSecond?: number
  id: string
  name: string
  alias: string
  value: number
}

export const getAllCoreResources = (): Promise<CoreResource[]> => {
  return Promise.resolve([
    {
      id: '1',
      name: 'Золото',
      alias: 'gold',
      quantityPerSecond: 100,
      value: 100
    },
    {
      id: '2',
      name: 'Дерево',
      alias: 'wood',
      value: 100
    },
    {
      id: '3',
      name: 'Камень',
      alias: 'stone',
      quantityPerSecond: 100,
      value: 100
    },
    {
      id: '4',
      name: 'Еда',
      alias: 'food',
      value: 100
    }
  ])
}
