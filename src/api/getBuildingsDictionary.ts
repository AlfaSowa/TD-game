import { Buildings } from '../shared/api/Buildings'
import { useApiWrapper } from '../shared/hooks'

export const getBuildingsDictionary = async () => {
  const { data } = await useApiWrapper<Buildings>(Buildings).buildingsControllerGetAll()

  return data
}
