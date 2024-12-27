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

import { HttpClient, RequestParams } from './http-client'

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags User
   * @name UserControllerFindAll
   * @request GET:/users
   * @response `200` `void`
   */
  userControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/users`,
      method: 'GET',
      ...params
    })
}
