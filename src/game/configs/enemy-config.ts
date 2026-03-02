export type EnemyType = 'warrior' | 'archer'

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
  archer: {
    health: 80,
    damage: 20
  }
}
