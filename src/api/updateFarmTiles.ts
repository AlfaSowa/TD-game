import { AxiosResponse } from 'axios'
import { axiosApi } from '../utils'

export const updateFarmTiles = async (ids: string[]): Promise<{ gold: number; data: any[] } | undefined> => {
  try {
    const { data }: AxiosResponse<{ gold: number; data: any[] }> = await axiosApi.post('/farm/farmtile', { ids })

    return data
  } catch (error) {
    console.log(error)
  }
}
