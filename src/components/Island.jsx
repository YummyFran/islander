import React from 'react'

const Island = ({gridWidth, xpos, ypos, hasTop, hasBottom, hasLeft, hasRight}) => {
  let layer = []

  const islandDimension = {
    width: gridWidth,
    height: gridWidth,
    top: ypos,
    left: xpos,
  }

  for(let i = 0; i < 10; i++) {
    layer.push(
      <div className={i < 3 ? 'top' : 'soil'} style={{transform: `translateZ(-${i*gridWidth*0.05}px)`}} key={i}></div>
    )
  }

  return (
    <div className={`island ${hasLeft ? 'has-left' : ''} ${hasRight ? 'has-right' : ''} ${hasTop ? 'has-top' : ''} ${hasBottom ? 'has-bottom' : ''}`} style={islandDimension}>
      {layer}
    </div>
  )
}

export default Island