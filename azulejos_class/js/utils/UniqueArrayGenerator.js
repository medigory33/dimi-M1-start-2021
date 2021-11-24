
/** @type {WeakMap<UniqueArrayGenerator, Set<string>>} */
const map = new WeakMap()

/** This has to be low, for performance reasons. 10 iterations are sufficient for a callback to produce a unique array. */
const MAX_ITERATIONS = 10

export class UniqueArrayGenerator {

  lastKey = 'none'

  constructor() {
    map.set(this, new Set())
  }

  /**
   * Generate a unique array based on its string representation (serialisation).
   * If the returned array has already been produced (same string), then the array is refreshed...
   * 
   * ... until the new brand array is unique or the "maxIterations" limit has been reached 
   * (end of the game: throw an Error).
   * 
   * @param {() => any[]} callback 
   */
  getUniqueArray(callback, {
    maxIterations = MAX_ITERATIONS,
  } = {}) {
    const set = map.get(this)

    let count = 0
    let array = callback()
    let key = array.join(',')
    
    while (set.has(key)) {
      
      array = callback()
      key = array.join(',')

      if (++count > maxIterations) {
        throw new Error(`"maxIterations" (${maxIterations}) has been reached!`)
      }
    }

    set.add(key)
    this.lastKey = key

    return array
  }
  
  getUniqueKeyAndArray(callback, {
    maxIterations = MAX_ITERATIONS,
  } = {}) {
    const array = this.getUniqueArray(callback, { maxIterations })
    return [this.lastKey, array]
  }

  clear() {
    map.get(this).clear()
  }
}