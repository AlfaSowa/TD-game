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

import { CreateResourcesDTO } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Resources<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Resources
   * @name ResourcesControllerCreateResource
   * @request POST:/resources
   * @response `201` `void`
   */
  resourcesControllerCreateResource = (data: CreateResourcesDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/resources`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params
    })
  /**
   * No description
   *
   * @tags Resources
   * @name ResourcesControllerGetAllResources
   * @request GET:/resources
   * @response `200` `void`
   */
  resourcesControllerGetAllResources = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/resources`,
      method: 'GET',
      ...params
    })
  /**
   * No description
   *
   * @tags Resources
   * @name ResourcesControllerDeleteResource
   * @request DELETE:/resources/{id}
   * @response `200` `void`
   */
  resourcesControllerDeleteResource = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/resources/${id}`,
      method: 'DELETE',
      ...params
    })
  /**
   * No description
   *
   * @tags Resources
   * @name ResourcesControllerUpdateResource
   * @request PATCH:/resources/{id}
   * @response `200` `void`
   */
  resourcesControllerUpdateResource = (id: string, data: CreateResourcesDTO, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/resources/${id}`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params
    })
  /**
   * No description
   *
   * @tags Resources
   * @name ResourcesControllerGetResourceById
   * @request GET:/resources/{id}
   * @response `200` `void`
   */
  resourcesControllerGetResourceById = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/resources/${id}`,
      method: 'GET',
      ...params
    })
}
