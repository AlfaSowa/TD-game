import { AxiosResponse } from 'axios'
import { axiosApi } from '../utils'

export const updateFarmTiles = async (id: string): Promise<{ coins: number; data: any[] } | undefined> => {
  try {
    const { data }: AxiosResponse<{ coins: number; data: any[] }> = await axiosApi.post('/farm/farmtile', { id })

    return data
  } catch (error) {
    console.log(error)
  }
}
