import { BaseEntity } from './base'

export class Cave extends BaseEntity {
  async init() {
    this.clicked(() => {
      console.log('Cave clicked')
    })
  }
}
