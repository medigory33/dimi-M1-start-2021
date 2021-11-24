import { Random } from './utils/random.js'

const seed = window.location.search.substring(1) || Date.now()
document.querySelector('footer input').classList.toggle('freezed', window.location.search.length > 1)
document.querySelector('footer input').value = seed
Random.seed(seed)

document.querySelector('footer button#freeze').classList.toggle('hidden', window.location.search.length > 1)
document.querySelector('footer button#freeze').onclick = () => {
  window.location.search = seed
}

document.querySelector('footer button#random').onclick = () => {
  window.location.search = ''
}
