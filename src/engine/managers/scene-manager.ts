import { Application } from 'pixi.js'
import { Scene } from '../core'

type SceneConstructor<C extends Scene> = new (id: string) => C

export class SceneManager {
  scenes = new Map<string, Scene>()
  app!: Application

  currentScene: Scene | undefined

  init(app: Application) {
    this.app = app
  }

  add(scene: SceneConstructor<Scene>) {
    const newScene = new scene(scene.name)
    newScene.init(this.app)
    this.scenes.set(newScene.id, newScene)
  }

  get(scene: SceneConstructor<Scene>) {
    return this.scenes.get(scene.name)
  }

  remove(scene: SceneConstructor<Scene>) {
    this.scenes.delete(scene.name)
  }

  loadScene(scene: SceneConstructor<Scene>) {
    if (this.currentScene) {
      this.removeFromStage(this.currentScene)
    }

    const newScene = this.scenes.get(scene.name)
    if (newScene) {
      this.app.stage.addChildAt(newScene.view, 0)

      console.log(this.app)
    }
  }

  removeFromStage(scene: Scene) {
    const tmpScene = this.scenes.get(scene.id)
    if (tmpScene) {
      tmpScene?.view.removeFromParent()
      //   tmpScene?.view.destroy()
    }
  }

  update(dt: number) {
    for (const scene of this.scenes.values()) {
      scene.update(dt)
    }
  }
}
