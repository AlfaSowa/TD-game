export class Entity {
  id!: number

  set setId(id: number) {
    this.id = id
  }

  get getId() {
    return this.id
  }
}
