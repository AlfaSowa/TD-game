import { BaseEntity } from '../base'

export enum SpellType {
  NOTARGET = 'NOTARGET',
  MELEE = 'MElEE',
  RANGE = 'RANGE'
}
export class BaseSpell extends BaseEntity {
  damage: number = 0

  type: SpellType = SpellType.NOTARGET
}
