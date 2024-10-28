import { axiosApi } from '../utils'

export const getFarmByUser = async (): Promise<any> => {
  try {
    const { data } = await axiosApi.post('/farm')

    return data
  } catch (error) {
    console.log(error)
  }
}
