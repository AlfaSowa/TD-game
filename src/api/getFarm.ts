import { Farm } from '../shared/api/Farm'
import { useApiWrapper } from '../shared/hooks'

export const getFarm = async () => {
  const { data } = await useApiWrapper<Farm>(Farm).farmControllerGetFarmByUser()

  return data
}
