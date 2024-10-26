import { axiosApi } from '../utils'

export const authUser = async (initData: string): Promise<any> => {
  try {
    const { data } = await axiosApi.post('/auth/register', {
      initData
    })

    return data
  } catch (error) {
    console.log(error)
  }
}
