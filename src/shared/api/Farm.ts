/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { Farm } from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class Farm<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Farm
   * @name FarmControllerGetFarmByUser
   * @request POST:/farm
   * @response `200` `Farm` Получили фермы игрока
   */
  farmControllerGetFarmByUser = (params: RequestParams = {}) =>
    this.request<Farm, any>({
      path: `/farm`,
      method: 'POST',
      format: 'json',
      ...params
    })
  /**
   * No description
   *
   * @tags Farm
   * @name FarmControllerUpdateFarmByUser
   * @request POST:/farm/update
   * @response `201` `void`
   */
  farmControllerUpdateFarmByUser = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/farm/update`,
      method: 'POST',
      ...params
    })
  /**
   * No description
   *
   * @tags Farm
   * @name FarmControllerUpdateFarmTile
   * @request POST:/farm/farmtile
   * @response `201` `void`
   */
  farmControllerUpdateFarmTile = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/farm/farmtile`,
      method: 'POST',
      ...params
    })
  /**
   * No description
   *
   * @tags Farm
   * @name FarmControllerGetAllFarm
   * @request GET:/farm/all
   * @response `200` `void`
   */
  farmControllerGetAllFarm = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/farm/all`,
      method: 'GET',
      ...params
    })
}
