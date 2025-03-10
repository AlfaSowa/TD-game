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

import { Build, CreateBuildDTO } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Buildings<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Buildings
   * @name BuildingsControllerCreate
   * @request POST:/buildings
   * @response `201` `void`
   */
  buildingsControllerCreate = (data: CreateBuildDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/buildings`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params
    })
  /**
   * No description
   *
   * @tags Buildings
   * @name BuildingsControllerGetAll
   * @request GET:/buildings
   * @response `200` `Build` Получить все постройки
   */
  buildingsControllerGetAll = (params: RequestParams = {}) =>
    this.request<Build, any>({
      path: `/buildings`,
      method: 'GET',
      format: 'json',
      ...params
    })
  /**
   * No description
   *
   * @tags Buildings
   * @name BuildingsControllerRemove
   * @request DELETE:/buildings/{id}
   * @response `200` `void`
   */
  buildingsControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/buildings/${id}`,
      method: 'DELETE',
      ...params
    })
}
