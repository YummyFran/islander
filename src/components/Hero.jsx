import React, {useState, useLayoutEffect} from 'react'

const Hero = ({heroWidth, offset, map}) => {
  const [heroCoord, setHeroCoord] = useState({x: 0, y: 0})

  const spawnPoint = (currMap) => {
    const point = () => Math.ceil(Math.random() * map.length);
    let x, y;
  
    do {
      x = point();
      y = point();
    } while (!currMap[y] || !currMap[y][x]);
  
    return { x: x * offset, y: y * offset };
  };

  const handleMove = (e) => {
    if (![37, 38, 39, 40, 65, 87, 68, 83, 81, 69, 16, 32].includes(e.keyCode)) return;
  
    const move = e.keyCode;
    const currX = heroCoord.x / offset;
    const currY = heroCoord.y / offset;
    let newX = currX;
    let newY = currY;
  
    switch (move) {
    case 37: // Left Arrow Key (or 'A' key)
    case 65: // 'A' key
      newX = !e.shiftKey ? currX - 1 : currX - 1;
      newY = !e.shiftKey ? currY : currY + 1;
      break;

    case 38: // Up Arrow Key (or 'W' key)
    case 87: // 'W' key
      newX = currX;
      newY = currY - 1;
      break;

    case 39: // Right Arrow Key (or 'D' key)
    case 68: // 'D' key
      newX = !e.shiftKey ? currX + 1 : currX + 1;
      newY = !e.shiftKey ? currY : currY + 1;
      break;
    case 40: // Down Arrow Key (or 'S' key)
    case 83: // 'S' key
      newX = currX;
      newY = currY + 1;
      break;
    case 81: // 'Q' key
      newX = currX - 1;
      newY = currY - 1;
      break;
    case 69: // 'E' key
      newX = currX + 1;
      newY = currY - 1;
      break;
    }
  
    const nextTile = map[newY] && map[newY][newX]
    if ([1,2].includes(nextTile)) {
      setHeroCoord({ x: newX * offset, y: newY * offset });
    }
  };

  const heroStyle = {
    width: heroWidth,
    top: heroCoord.y,
    left: heroCoord.x
  }

  useLayoutEffect(() => {
    setHeroCoord(c => ({...c, ...spawnPoint(map)}))
  }, [])

  useLayoutEffect(() => {
    document.addEventListener('keydown', handleMove);
    return () => {
      document.removeEventListener('keydown', handleMove);
    };
  }, [heroCoord]);

  return (
    <div className='character' style={heroStyle}></div>
  )
}

export default Hero