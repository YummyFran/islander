import React, { useState } from 'react'
import Island from '../components/Island'
import { generateMap } from '../utils/generateMap'
import Hero from '../components/Hero'
import Bridge from '../components/Bridge'

const Game = () => {
  const [gridSize] = useState(20)
  const [seed] = useState(undefined)
  const [islandMap] = useState(generateMap(gridSize, seed))

  // console.log(islandMap)

  const cellWidth = Math.min(window.innerWidth, window.innerHeight) / gridSize

  const biome = islandMap.map((y,i) => {
    return y.map((x, j) => {
      const hasTop = islandMap[i-1] !== undefined && islandMap[i-1][j] !== 0
      const hasBottom = islandMap[i+1] !== undefined && islandMap[i+1][j] !== 0
      const hasLeft = islandMap[i][j-1] !== undefined && islandMap[i][j-1] !== 0
      const hasRight = islandMap[i][j+1] !== undefined && islandMap[i][j+1] !== 0

      return(
        x === 1 ?
        <Island 
          gridWidth={cellWidth} 
          xpos={j * cellWidth} 
          ypos={i * cellWidth}
          hasTop={hasTop}
          hasBottom={hasBottom}
          hasLeft={hasLeft}
          hasRight={hasRight}
          key={i*Math.floor(gridSize) + j}/> :
        x === 2 &&
        <Bridge 
          gridWidth={cellWidth}
          xpos={j * cellWidth}
          ypos={i * cellWidth}
          hasTop={hasTop}
          hasBottom={hasBottom}
          hasLeft={hasLeft}
          hasRight={hasRight}
          key={i*Math.floor(gridSize) + j}/>
      )
    })
  })

  return (
    <div className='game-container'>
      { biome }
      <Hero heroWidth={cellWidth * 0.6} offset={cellWidth} map={islandMap}/>
    </div>
  )
}

export default Game