import { Random } from './utils/random.js'

export const getRandomColor = () => {
  const r = Random.random()
  if (r < 0.5) {
    if (Random.chance(0.5)) {
      return '#baf25a'
    }
    return '#e0bb41'
  }
  if (r < 0.7) {
    return '#32a89e'
  }
  if (r < 0.9) {
    return '#06069f'
  }
  return '#5d69c9'
}

export const getRandomColorIncludingWhite = (whiteProbability = .2) => {
  if (Random.chance(whiteProbability)) {
    return 'white'
  }
  return getRandomColor()
}
