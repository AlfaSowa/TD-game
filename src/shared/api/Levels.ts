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

import { CreateLevelDto, UpdateLevelDto } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Levels<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Levels
   * @name LevelsControllerCreate
   * @request POST:/levels
   * @response `201` `void`
   */
  levelsControllerCreate = (data: CreateLevelDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/levels`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params
    })
  /**
   * No description
   *
   * @tags Levels
   * @name LevelsControllerFindAll
   * @request GET:/levels
   * @response `200` `void`
   */
  levelsControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/levels`,
      method: 'GET',
      ...params
    })
  /**
   * No description
   *
   * @tags Levels
   * @name LevelsControllerFindOne
   * @request GET:/levels/{id}
   * @response `200` `void`
   */
  levelsControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/levels/${id}`,
      method: 'GET',
      ...params
    })
  /**
   * No description
   *
   * @tags Levels
   * @name LevelsControllerUpdate
   * @request PATCH:/levels/{id}
   * @response `200` `void`
   */
  levelsControllerUpdate = (id: string, data: UpdateLevelDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/levels/${id}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params
    })
  /**
   * No description
   *
   * @tags Levels
   * @name LevelsControllerRemove
   * @request DELETE:/levels/{id}
   * @response `200` `void`
   */
  levelsControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/levels/${id}`,
      method: 'DELETE',
      ...params
    })
}
