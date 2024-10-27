import { axiosApi } from '../utils'

export const getFarmByUser = async (initData: string): Promise<any> => {
  try {
    const { data } = await axiosApi.post('/farm', {
      initData
    })

    return data
  } catch (error) {
    console.log(error)
  }
}
