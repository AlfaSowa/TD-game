import { useMemo } from 'react'
import { ABILITIES, ABILITIES_IDS } from '../../mock-data'

type AbilitiesComponentProps = {
  handleAbilities: (id: string) => void
}
export const AbilitiesComponent = ({ handleAbilities }: AbilitiesComponentProps) => {
  const abilitiesIdsArr: string[] = useMemo(() => {
    const count = 3

    const isCountMoreThanArrayLength = count > ABILITIES_IDS.length
    const isCountLessThanOne = count < 1
    const isCountInteger = Math.round(count) === count

    if (isCountMoreThanArrayLength || isCountLessThanOne || !isCountInteger) return []

    const usedIndexes = new Set()

    while (usedIndexes.size !== count) {
      usedIndexes.add(Math.floor(Math.random() * ABILITIES_IDS.length))
    }

    return [...usedIndexes].map((i) => ABILITIES_IDS[i as any])
  }, [])

  return (
    <div className="absolute inset-0 z-50 p-2 flex items-center justify-center">
      <div className="bg-white w-full flex gap-2">
        {abilitiesIdsArr.map((i, idx) => (
          <button
            key={idx}
            className="basis-1/3 bg-slate-100 h-80 flex flex-col gap-4"
            onClick={() => handleAbilities(i)}
          >
            <div className="h-24 max-h-24">{(ABILITIES as any)[i].description}</div>

            <div>{(ABILITIES as any)[i].name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
