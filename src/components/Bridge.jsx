import React from 'react'

const Bridge = ({gridWidth, xpos, ypos, hasLeft, hasRight, hasTop, hasBottom}) => {
  let layer = []

  const bridgeDimension = {
    width: gridWidth,
    height: gridWidth,
    top: ypos,
    left: xpos,
  }

  for(let i = 0; i < 3; i++) {
    layer.push(
      <div className='bridge-layer' style={{transform: `translateZ(-${i*1.8}px)`}} key={i}></div>
    )
  }

  return (
    <div className={`bridge ${hasLeft ? 'has-left' : ''} ${hasRight ? 'has-right' : ''} ${hasTop ? 'has-top' : ''} ${hasBottom ? 'has-bottom' : ''}`} style={bridgeDimension}>
      {layer}
    </div>
  )
}

export default Bridge