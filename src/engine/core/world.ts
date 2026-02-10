import { Component } from '../ecs/components'
import { Entity } from '../ecs/entities'

type ComponentConstructor<C extends Component> = new (...args: any[]) => C

export class World {
  private nextEntityId: number = 0

  private entities = new Map<number, Entity>()
  private components = new Map<string, Map<Entity, Component>>()

  public createEntity<T extends Entity>(supplier: { new (): T }): T {
    const id = this.nextEntityId++
    const entity = new supplier()

    this.entities.set(id, entity)

    entity.setId = id

    return entity
  }

  public getEntity<T extends Entity>(entityId: number): T | null {
    const entity = this.entities.get(entityId)
    if (!entity) return null

    return entity as T
  }

  public destroyEntity<T extends Entity>(entity: T) {
    this.entities.delete(entity.getId)
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

  public with(...componentClasses: ComponentConstructor<Component>[]) {
    return [...this.entities.values()].filter((entity) => {
      return componentClasses.every((componentClass) => {
        return this.getComponent(entity, componentClass)
      })
    })
  }
}
