import { getPixel, setPixel } from './utils/canvas.js' 
import { setAntPosition } from './utils/setAntPosition.js'
import { directions } from './directions.js'

let direction = directions.up
let x = 64
let y = 64

requestAnimationFrame(() => {
  setAntPosition(x, y, direction)
})

const moveForward = () => {

  if (direction === directions.up) {
    x = x
    y = y - 1
  } else if (direction === directions.right) {
    x = x + 1
    y = y
  } else if (direction === directions.bottom) {
    x = x
    y = y + 1
  } else if (direction === directions.left) {
    x = x - 1
    y = y
  }
}

const turnLeft = () => {

  if (direction === directions.up) {
    direction = directions.left
  } else {
    direction = direction - 1
  }
}

const turnRight = () => {

  if (direction === directions.left) {
    direction = directions.up
  } else {
    direction = direction + 1
  }
}

const move = () => {

  const currentPixel = getPixel(x, y)

  if (currentPixel === '#ffffff') {
    setPixel(x, y, '#ee0034')
    turnLeft()
  } else {
    setPixel(x, y, '#ffffff')
    turnRight()
  }

  moveForward()
  setAntPosition(x, y, direction)
}


export {
  x,
  y,
  direction,
  move,
}
