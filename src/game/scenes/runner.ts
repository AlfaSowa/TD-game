import { Engine } from '../../engine/core'
import { DungeonScene } from './dungeon-scene'
import { MainMenuScene } from './main-menu-scene'
import { MapScene } from './map-scene'

export const scenesRunner = (engine: Engine) => {
  engine.sceneManager.add(MainMenuScene, false)
  engine.sceneManager.add(DungeonScene, false)
  engine.sceneManager.add(MapScene)

  //init first scene
  engine.sceneManager.loadScene(MainMenuScene)
}
