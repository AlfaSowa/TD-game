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

export interface CreateBuildDTO {
  /**
   * Название постройки
   * @example "Замок"
   */
  name: string
}

export interface Build {
  id: string
  name: string
}

export type CreateLevelDto = object

export type UpdateLevelDto = object
