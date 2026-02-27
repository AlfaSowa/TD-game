export type AbilitiesIds = 'fireball' | 'heal'

type TargetsType = 'enemy' | 'self'

type EffectType = 'damage' | 'heal' | 'critChance' | 'interval'

type Effect = {
  type: EffectType
  amount?: number
}

export type AbilitiesConfigType = {
  [key in AbilitiesIds]: {
    id: AbilitiesIds
    name: string
    cost: number
    cooldown: number
    targetType: TargetsType
    effects: Effect[]
  }
}

export const abilitiesConfigs: AbilitiesConfigType = {
  fireball: {
    id: 'fireball',
    name: 'Fireball',
    targetType: 'enemy',
    cost: 0,
    cooldown: 0,
    effects: [
      {
        type: 'damage',
        amount: 20
      },
      {
        type: 'critChance',
        amount: 0
      }
    ]
  },
  heal: {
    id: 'heal',
    name: 'Heal',
    targetType: 'self',
    cost: 0,
    cooldown: 0,
    effects: [
      {
        type: 'heal',
        amount: 100
      }
    ]
  }
}
