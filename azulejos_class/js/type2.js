import { getRandomColorIncludingWhite } from './colors.js'
import { Random } from './utils/random.js'
import { UniqueArrayGenerator } from './utils/UniqueArrayGenerator.js'

const generator = new UniqueArrayGenerator()

const source = document.querySelector('#library .type2')

const getRandomCornerLetter = () => {
  if (Random.chance(0.5)) {
    return 'K'
  }
  if (Random.chance(0.5)) {
    return 'Q'
  }
  return 'X'
}

const getRandomMiddleLetter = () => {
  if (Random.chance(0.5)) {
    return 'A'
  }
  if (Random.chance(0.5)) {
    return 'Q'
  }
  return 'V'
}

export const createType2 = () => {
  const clone = source.cloneNode(true)
  const [key, [
    color1, 
    color2, 
    color3, 
    color4, 
    cornerLetter,
    middleLetter,
  ]] = generator.getUniqueKeyAndArray(
    () => [
      getRandomColorIncludingWhite(.4), 
      getRandomColorIncludingWhite(), 
      getRandomColorIncludingWhite(), 
      getRandomColorIncludingWhite(), 
      getRandomCornerLetter(),
      getRandomMiddleLetter(),
    ]
  )
  clone.dataset.tileKey = key
  clone.style.backgroundColor = color1

  for (const element of clone.querySelectorAll('.corner')) {
    element.style.color = color2
    element.innerHTML = cornerLetter
  }

  for (const element of clone.querySelectorAll('.middle')) {
    element.style.color = color3
    element.style.backgroundColor = color4
    element.innerHTML = middleLetter
  }

  return clone
}
