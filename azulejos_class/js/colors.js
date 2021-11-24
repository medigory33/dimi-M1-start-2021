import { Random } from './utils/random.js'

export const getRandomColor = () => {
  const r = Random.random()
  if (r < 0.5) {
    if (Random.chance(0.5)) {
      return '#b92e15'
    }
    return 'tomato'
  }
  if (r < 0.7) {
    return '#df5eef'
  }
  if (r < 0.9) {
    return '#06069f'
  }
  return '#5bacff'
}

export const getRandomColorIncludingWhite = (whiteProbability = .2) => {
  if (Random.chance(whiteProbability)) {
    return 'white'
  }
  return getRandomColor()
}
