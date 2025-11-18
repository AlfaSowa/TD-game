import { ResourcesSystem } from './entities'
import {
  CastleScreenSystem,
  CaveScreenSystem,
  DungeonScreenSystem,
  PossessionScreenSystem,
  ScreensSystem
} from './screens'
import { DungeonSystem, EntitiesRenderSystem, FetchDataSystem, HudSystem, PlayerSystem, SystemRunner } from './systems'

export const coreSystems = (systems: SystemRunner) => {
  //systems
  //fetch data systems
  systems.add(EntitiesRenderSystem)
  systems.add(FetchDataSystem)

  //core
  // systems.add(ItemsSystem)
  systems.add(ScreensSystem)
  systems.add(PlayerSystem)
  // systems.add(StoreSystem)

  //subcore
  systems.add(HudSystem)
  // systems.add(SpawnersSystem)
  // systems.add(LevelingSystem)
  // this.systems.add(TimersSystem)

  //screens
  systems.add(PossessionScreenSystem)
  systems.add(CastleScreenSystem)
  systems.add(CaveScreenSystem)
  systems.add(DungeonScreenSystem)

  systems.add(DungeonSystem)

  //helpers
  systems.add(ResourcesSystem)

  systems.get(EntitiesRenderSystem).init()

  systems
    .get(FetchDataSystem)
    .getImportantData()
    .then(() => {
      systems.init()
    })
}
