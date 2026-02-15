import { Component } from '../ecs/components'
import { Entity } from '../ecs/entities'

type ComponentConstructor<C extends Component> = new (...args: any[]) => C

export class World {
  private entities = new Map<number, Entity>()
  private components = new Map<string, Map<Entity, Component>>()
  private singletons = new Map<string, number>()

  public createEntity<T extends Entity>(supplier?: { new (): T }): T {
    const entity = supplier ? new supplier() : (new Entity() as T)

    this.entities.set(entity.uid, entity)

    return entity
  }

  public getEntity<T extends Entity>(entityId: number): T | null {
    const entity = this.entities.get(entityId)
    if (!entity) return null

    return entity as T
  }

  public destroyEntity<E extends Entity>(entity: E) {
    this.entities.delete(entity.uid)
    for (const component of this.components.values()) {
      component.delete(entity)
    }
  }

  public addComponent<C extends Component, E extends Entity>(entity: E, component: C) {
    const type = component.constructor.name
    if (!this.components.has(type)) {
      this.components.set(type, new Map())
    }

    this.components.get(type)?.set(entity, component)
  }

  public removeComponent<C extends Component, E extends Entity>(entity: E, component: ComponentConstructor<C>) {
    const componentMap = this.components.get(component.name)
    if (componentMap) {
      componentMap.delete(entity)
    }
  }

  public getComponent<C extends Component, E extends Entity>(
    entity: E,
    component: ComponentConstructor<C>
  ): C | undefined {
    const componentMap = this.components.get(component.name)
    return componentMap ? (componentMap!.get(entity) as C) : undefined
  }

  public getSingleton<C extends Component>(component: ComponentConstructor<C>) {
    const id = this.singletons.get(component.name)
    if (!id) return null
    return this.getEntity(id)
  }

  public getOrCreateSingleton<C extends Component>(component: ComponentConstructor<C>, componentInstance: C) {
    const existing = this.getSingleton(component)
    if (existing) return existing

    const created = this.createEntity()

    this.addComponent(created, componentInstance)
    this.singletons.set(component.name, created.uid)

    return created
  }

  public with(...componentClasses: ComponentConstructor<Component>[]) {
    return [...this.entities.values()].filter((entity) => {
      return componentClasses.every((componentClass) => {
        return this.getComponent(entity, componentClass)
      })
    })
  }
}
