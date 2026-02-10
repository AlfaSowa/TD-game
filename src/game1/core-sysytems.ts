import { DungeonSystem } from './components'
import { PlayerSystem } from './player'

import { ScreensSystem } from './screens'
import {
  EntitiesRenderSystem,
  FetchDataSystem,
  HudSystem,
  InteractionSystem,
  ResourcesSystem,
  SystemRunner
} from './systems'

export const coreSystems = (systems: SystemRunner) => {
  //systems
  //fetch data
  systems.add(FetchDataSystem)

  //render
  systems.add(EntitiesRenderSystem)

  //core
  // systems.add(ItemsSystem)
  systems.add(ScreensSystem)
  systems.add(PlayerSystem)

  // systems.add(StoreSystem)

  //screens
  systems.get(ScreensSystem).addScreens()

  //subcore
  systems.add(HudSystem)
  // systems.add(SpawnersSystem)
  // systems.add(LevelingSystem)
  // this.systems.add(TimersSystem)

  systems.add(DungeonSystem)

  //helpers
  systems.add(ResourcesSystem)
  systems.add(InteractionSystem)

  systems.get(EntitiesRenderSystem).init()

  systems
    .get(FetchDataSystem)
    .getImportantData()
    .then(() => {
      systems.init()
    })
}
