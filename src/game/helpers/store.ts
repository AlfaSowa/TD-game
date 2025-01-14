class Store {
  getItem(key: string) {
    return localStorage.getItem(key)
  }

  setItem(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data))
  }
}

export const store = new Store()
