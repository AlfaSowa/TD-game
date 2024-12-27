type CoreResource = {
  quantityPerSecond: number
  id: string
  name: string
  alias: string
}

export const getAllCoreResources = (): Promise<CoreResource[]> => {
  return Promise.resolve([
    {
      id: '1',
      name: 'Золото',
      alias: 'gold',
      quantityPerSecond: 100
    }
  ])
}
