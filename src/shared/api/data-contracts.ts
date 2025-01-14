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

export type UpdateCategoryDto = object

export type User = object

export interface Farm {
  id: string
  user: User
  data: string[]
}

export interface CreateResourcesDTO {
  /**
   * Название ресурса
   * @example "Камень"
   */
  name: string
  /**
   * Тип ресурса - plant или fossil
   * @example "plant"
   */
  type: string
  options: object
}
