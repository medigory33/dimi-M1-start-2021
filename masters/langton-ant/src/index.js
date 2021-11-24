import * as ant from './ant.js'

let pause = true
let speed = 1

const loop = () => {

  requestAnimationFrame(loop)

  if (!pause) {
    for (let index = 0; index < speed; index++) {
      ant.move()
    }
  }
}

loop()

document.querySelector('#move').onclick = () => {
  ant.move()
}
document.querySelector('#play-pause').onclick = () => {
  pause = !pause
}
document.querySelector('#speed-1').onclick = () => {
  speed = 1
}
document.querySelector('#speed-4').onclick = () => {
  speed = 4
}
document.querySelector('#speed-16').onclick = () => {
  speed = 16
}
document.querySelector('#speed-64').onclick = () => {
  speed = 64
}
document.querySelector('#speed-256').onclick = () => {
  speed = 256
}

