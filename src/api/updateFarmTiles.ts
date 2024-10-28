import { AxiosResponse } from 'axios'
import { axiosApi } from '../utils'

export const updateFarmTiles = async (id: string) => {
  try {
    const { data }: AxiosResponse<any[]> = await axiosApi.post('/farm/farmtile', { id })

    return data
  } catch (error) {
    console.log(error)
  }
}
