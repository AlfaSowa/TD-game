import {
  CastleScreenSystem,
  CaveScreenSystem,
  DungeonMapScreenSystem,
  DungeonSystem,
  EntitiesRenderSystem,
  FetchDataSystem,
  HudSystem,
  PossessionScreenSystem,
  ResourcesSystem,
  ScreensSystem,
  SystemRunner
} from './systems'

export const coreSystems = (systems: SystemRunner) => {
  //systems
  //fetch data systems
  systems.add(EntitiesRenderSystem)
  systems.add(FetchDataSystem)

  //core
  // systems.add(ItemsSystem)
  systems.add(ScreensSystem)
  // systems.add(StoreSystem)

  //subcore
  systems.add(HudSystem)
  // systems.add(SpawnersSystem)
  // systems.add(LevelingSystem)
  // systems.add(AbilitiesSystem)
  // this.systems.add(TimersSystem)

  //screens
  systems.add(PossessionScreenSystem)
  systems.add(CastleScreenSystem)
  systems.add(CaveScreenSystem)
  systems.add(DungeonMapScreenSystem)

  systems.add(DungeonSystem)

  //entities
  // systems.add(CitySystem)
  // this.systems.add(FarmSystem)
  // this.systems.add(SawmillSystem)

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
