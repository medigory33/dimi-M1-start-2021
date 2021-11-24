import { getRandomColor } from './colors.js'
import { UniqueArrayGenerator } from './utils/UniqueArrayGenerator.js'

export const initType3 = async () => {
  const response = await fetch('./assets/tile-A.svg')
  const svg = await response.text()
  document.querySelector('#library .type3').innerHTML = svg
}

const generator = new UniqueArrayGenerator()

export const createType3 = () => {
  const source = document.querySelector('#library .type3')
  const clone = source.cloneNode(true)
  const [key, [color1, color2, color3, color4]] = generator.getUniqueKeyAndArray(() => [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()])
  clone.dataset.tileKey = key
  
  for (const element of clone.querySelectorAll('svg *[fill="#FF0000"')) {
    element.setAttributeNS(null, 'fill', color1)
  }
  
  for (const element of clone.querySelectorAll('svg *[fill="#FFFF00"')) {
    element.setAttributeNS(null, 'fill', color2)
  }
  
  for (const element of clone.querySelectorAll('svg *[fill="#00FFFF"')) {
    element.setAttributeNS(null, 'fill', color3)
  }
  
  for (const element of clone.querySelectorAll('svg *[fill="#0000FF"')) {
    element.setAttributeNS(null, 'fill', color4)
  }
  
  return clone
}
