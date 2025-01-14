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

import { UpdateCategoryDto } from './data-contracts'
import { ContentType, HttpClient, RequestParams } from './http-client'

export class Categories<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Categories
   * @name CategoriesControllerGetAllProjects
   * @request GET:/categories
   * @response `200` `void`
   */
  categoriesControllerGetAllProjects = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/categories`,
      method: 'GET',
      ...params
    })
  /**
   * No description
   *
   * @tags Categories
   * @name CategoriesControllerCreateProject
   * @request POST:/categories
   * @response `201` `void`
   */
  categoriesControllerCreateProject = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/categories`,
      method: 'POST',
      ...params
    })
  /**
   * No description
   *
   * @tags Categories
   * @name CategoriesControllerUpdate
   * @request PATCH:/categories
   * @response `200` `void`
   */
  categoriesControllerUpdate = (data: UpdateCategoryDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/categories`,
      method: 'PATCH',
      body: data,
      type: ContentType.Json,
      ...params
    })
  /**
   * No description
   *
   * @tags Categories
   * @name CategoriesControllerGetCurrentProject
   * @request GET:/categories/{id}
   * @response `200` `void`
   */
  categoriesControllerGetCurrentProject = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/categories/${id}`,
      method: 'GET',
      ...params
    })
  /**
   * No description
   *
   * @tags Categories
   * @name CategoriesControllerDeleteProject
   * @request DELETE:/categories/{id}
   * @response `200` `void`
   */
  categoriesControllerDeleteProject = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/categories/${id}`,
      method: 'DELETE',
      ...params
    })
}
