import { MouseEvent, useEffect, useState } from 'react'
import { CHECK_CASTLE_CELL, CHECK_CELL_TO_BUY, UPDATE_CASTLE_GRID } from '../../game/constants'
import { events, state } from '../../game/core'
import { CastleGrid as CastleGridType } from '../../game/objects/buildings/types'

interface CastleGridProps {
  onClose: (value: boolean) => void
}

export const CastleGrid = ({ onClose }: CastleGridProps) => {
  const [grid, setGrid] = useState<CastleGridType[]>(state.getCastleGrid)
  const [options, setOptions] = useState<boolean>(false)

  const handleClick = (e: MouseEvent<HTMLDivElement>, item: CastleGridType) => {
    setOptions(true)

    if (!item.purchased) {
      events.emit(CHECK_CELL_TO_BUY, item.id)
    } else {
      events.emit(CHECK_CASTLE_CELL, item.id)
    }
  }

  useEffect(() => {
    const eventID = events.on(UPDATE_CASTLE_GRID, this, (grid: CastleGridType[]) => {
      console.log('UPDATE_CASTLE_GRID')
      setGrid(grid)
    })

    return () => {
      events.remove(eventID)
    }
  }, [])

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-slate-300">
      <div className="flex justify-end p-2">
        <button onClick={() => onClose(false)}>CLOSE</button>
      </div>

      <div className="flex gap-2">
        <div className="bg-slate-600 px-2 py-4">тестовая</div>
        <div className="bg-slate-600 px-2 py-4">тестовая</div>
        <div className="bg-slate-600 px-2 py-4">тестовая</div>
        <div className="bg-slate-600 px-2 py-4">тестовая</div>
      </div>

      <div className="bg-slate-100 grid grid-cols-3">
        {grid.map((item) => (
          <>
            {item.available && (
              <>
                {!item.purchased && (
                  <div onClick={(e) => handleClick(e, item)} className="relative pb-[100%] flex-col bg-red-300">
                    <div className="w-full absolute top-0 left-0 flex flex-col p-2">
                      <div>{item.id}</div>
                      <div>price {item.price}</div>
                    </div>
                  </div>
                )}

                {item.purchased && (
                  <div onClick={(e) => handleClick(e, item)} className="relative pb-[100%] bg-slate-200">
                    <div className="w-full absolute top-0 left-0 flex flex-col p-2">
                      <div>{item.id}</div>
                      <div>куплено</div>
                    </div>
                  </div>
                )}
              </>
            )}

            {!item.available && <div className="relative pb-[100%] bg-green-300">недоступно</div>}
          </>
        ))}
      </div>

      {options && (
        <div
          onClick={() => setOptions(false)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 p-2"
        >
          какойто текст
        </div>
      )}
    </div>
  )
}
