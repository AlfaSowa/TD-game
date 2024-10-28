import { axiosApi } from '../utils'

export const authUser = async (): Promise<any> => {
  try {
    const { data } = await axiosApi.post('/auth/register')

    return data
  } catch (error) {
    console.log(error)
  }
}
