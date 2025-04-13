import {
  AbilitiesSystem,
  BuildingsSystem,
  CitySystem,
  HudSystem,
  ItemsSystem,
  LevelingSystem,
  PossessionScreenSystem,
  ResourcesSystem,
  ScreensSystem,
  SpawnersSystem,
  StoreSystem,
  SystemRunner
} from './systems'

export const coreSystems = (systems: SystemRunner) => {
  //systems
  //core
  systems.add(BuildingsSystem)
  systems.add(ItemsSystem)
  systems.add(ScreensSystem)
  systems.add(StoreSystem)

  //subcore
  systems.add(HudSystem)
  systems.add(SpawnersSystem)
  systems.add(LevelingSystem)
  systems.add(AbilitiesSystem)
  // this.systems.add(TimersSystem)

  //screens
  systems.add(PossessionScreenSystem)

  //entities
  systems.add(CitySystem)
  // this.systems.add(FarmSystem)
  // this.systems.add(SawmillSystem)

  //helpers
  systems.add(ResourcesSystem)

  systems.init()
}
