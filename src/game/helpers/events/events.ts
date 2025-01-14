type CallbackType = (...args: any) => any

type CallbacksItemType = {
  id: number
  eventName: string
  caller: any
  callback: CallbackType
}

class Events {
  callbacks: CallbacksItemType[] = []
  nextId: number = 0

  //вызываем евент и передаем value
  emit(eventName: string, value?: any) {
    for (let i = 0; i < this.callbacks.length; i++) {
      if (this.callbacks[i].eventName === eventName) {
        this.callbacks[i].callback(value)
      }
    }
  }

  //подписаться на евент
  on(eventName: string, caller: any, callback: CallbackType) {
    this.nextId++

    this.callbacks.push({
      id: this.nextId,
      eventName,
      callback,
      caller
    })

    return this.nextId
  }

  //удалить евент по id
  remove(id: number) {
    this.callbacks = this.callbacks.filter((callback) => callback.id !== id)
  }

  //отписаться от евента
  unsubscribe(caller: any) {
    this.callbacks = this.callbacks.filter((callback) => callback.caller !== caller)
  }
}

export const events = new Events()
