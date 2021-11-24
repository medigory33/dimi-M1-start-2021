const img = document.querySelector('img#ant')
const canvas = document.querySelector('canvas')

export const setAntPosition = (x, y, direction) => {
  const left = canvas.offsetLeft + ((x + 0.5) / canvas.width) * canvas.offsetWidth
  const top = canvas.offsetTop + ((y + 0.5) / canvas.height) * canvas.offsetHeight
  const angle = 90 * direction
  img.style.left = `${left}px`
  img.style.top = `${top}px`
  img.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
}