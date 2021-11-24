import { getRandomColorIncludingWhite } from './colors.js'
import { UniqueArrayGenerator } from './utils/UniqueArrayGenerator.js'

const generator = new UniqueArrayGenerator()

const source = document.querySelector('#library .type1')

export const createType1 = () => {
  const clone = source.cloneNode(true)
  const [key, [
    color1, 
    color2, 
    color3, 
    color4,
  ]] = generator.getUniqueKeyAndArray(() => [
    getRandomColorIncludingWhite(), 
    getRandomColorIncludingWhite(), 
    getRandomColorIncludingWhite(), 
    getRandomColorIncludingWhite(),
  ])
  clone.dataset.tileKey = key
  clone.style.backgroundColor = color1
  clone.querySelector('.layer1').style.backgroundColor = color2
  clone.querySelector('.layer2').style.backgroundColor = color3
  clone.querySelector('.layer3').style.backgroundColor = color4
  return clone
}
