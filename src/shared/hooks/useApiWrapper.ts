import { getCookie } from '../../utils'

interface ApiClass<T> {
  new (...args: any): T
}

export const useApiWrapper = <T>(Api: ApiClass<T>): T => {
  const innerData =
    getCookie('innerData') || JSON.parse(sessionStorage.getItem('__telegram__initParams') as string).tgWebAppData

  return new Api({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`,
    headers: {
      ['x-innerData']: innerData
    }
  })
}
