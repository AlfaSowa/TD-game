export type EnemyType = 'warrior' | 'mage'

export type EnemyConfigType = {
  [key in EnemyType]: {
    health: number
    damage: number
  }
}

export const enemyConfigs: EnemyConfigType = {
  warrior: {
    health: 150,
    damage: 10
  },
  mage: {
    health: 80,
    damage: 20
  }
}
