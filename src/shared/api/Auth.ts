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

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerRegister
   * @request POST:/auth/register
   * @response `201` `void`
   */
  authControllerRegister = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/auth/register`,
      method: 'POST',
      ...params
    })
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerGetAllUsers
   * @request GET:/auth/all
   * @response `200` `void`
   */
  authControllerGetAllUsers = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/auth/all`,
      method: 'GET',
      ...params
    })
}
