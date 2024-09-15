import { useEffect, useState } from 'react'
import { CHECK_CASTLE_CELL, CHECK_CELL_TO_BUY, UPDATE_CASTLE_GRID } from '../../game/constants'
import { events, state } from '../../game/core'
import { CastleGrid as CastleGridType } from '../../game/objects/buildings/types'

export const CastleGrid = () => {
  const [grid, setGrid] = useState<CastleGridType[]>(state.getCastleGrid)

  const handleClick = (item: CastleGridType) => {
    if (item.disable) {
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
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 h-5/6 bg-slate-100 grid grid-cols-3">
      {grid.map((item) => (
        <>
          {item.disable && (
            <div onClick={() => handleClick(item)} className="bg-slate-200">
              <div>{item.id}</div>
              <div>{item.price}</div>
            </div>
          )}

          {!item.disable && (
            <div onClick={() => handleClick(item)} className="bg-red-300">
              <div>{item.id}</div>
              <div>{item.price}</div>
            </div>
          )}
        </>
      ))}
    </div>
  )
}
