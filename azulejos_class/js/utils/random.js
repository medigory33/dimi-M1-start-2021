const next = (value) => value * 16807 % 2147483647

const init = (value) => {
  value = Math.floor(value || 123456789)
  value %= 2147483647
  value += value < 0 ? 2147483647 : 0
  return next(value)
}

const toRange01 = value => (value - 1) / 2147483646

let current = init()

/**
 * A integer between 0 and 2147483647.
 * @param {number} value 
 */
export const seed = (value) => {
  current = init(value)
}

export const random = () => {
  current = next(current)
  return toRange01(current)
}

export class Random {
  #current = NaN
  #initialSeed = NaN

  constructor(value = NaN) {
    this.reset(value)
  }

  reset(value = this.#initialSeed) {
    this.#initialSeed = value
    this.#current = init(value)
  }
 
  static seed(value) {
    current = init(value)
    return Random
  }
  
  seed(value) {
    this.#current = init(value)
    return this
  }

  static next(count = 1) {
    while (count--) {
      current = next(current)
    }
    return Random
  }
  
  next(count = 1) {
    while (count--) {
      this.#current = next(this.#current)
    }
    return this
  }

  static random() {
    current = next(current)
    return toRange01(current)
  }
  
  random() {
    this.#current = next(this.#current)
    return toRange01(this.#current)
  }

  /** @param {number} p */
  static chance(p) {
    return Random.random() < p
  }
  
  /** @param {number} p */
  chance(p) {
    return this.random() < p
  }

  /** @param {{ min?:number, max?:number }} param0 */
  static float({ min = 0, max = 1 }) {
    return min + (max - min) * Random.random()
  }
  
  /** @param {{ min?:number, max?:number }} param0 */
  float({ min = 0, max = 1 }) {
    return min + (max - min) * this.random()
  }

  /**
   * Returns an integer between "min" inclusive and "max" exclusive
   * @param {{ min?:number, max?:number }} param0 
   */
  static integer({ min = 0, max = 100 } = {}) {
    return Math.floor(min + (max - min) * Random.random())
  }

  integer({ min = 0, max = 100 } = {}) {
    return Math.floor(min + (max - min) * this.random())
  }

  /**
   * Returns a zero-based index (an integer between 0 inclusive and "length" exclusive).
   * @param {number} length
   */
  static index(length) {
    return Math.floor(length * Random.random())
  }
  
  /**
   * Returns a zero-based index (an integer between 0 inclusive and "length" exclusive).
   * @param {number} length
   */
  index(length) {
    return Math.floor(length * this.random())
  }

  /**
   * Returns a random item from an array.
   * @param {any[]} array 
   */
  static item(array) {
    return array[Random.index(array.length)]
  }

  /**
   * Returns a random item from an array.
   * @param {any[]} array 
   */
  item(array) {
    return array[this.index(array.length)]
  }

  /**
   * Returns an array of items randomly picked from the given array. There will be no duplicates.
   * 
   * Note: `count` will be clamped to (0, array.length), so the returned array could not hold more than `array.length` items.
   * @param {any[]} array 
   * @param {number} count 
   */
  static uniqueItems(array, count, scope = Random) {
    if (count > array.length) {
      count = array.length
    }
    const array2 = [...array]
    const items = []
    while (items.length < count) {
      const index = scope.index(array2.length)
      const [item] = array2.splice(index, 1)
      items.push(item)
    }
    return items
  }

  /**
   * Returns an array of items randomly picked from the given array. There will be no duplicates.
   * 
   * Note: `count` will be clamped to (0, array.length), so the returned array could not hold more than `array.length` items.
   * @param {any[]} array 
   * @param {number} count 
   */
  uniqueItems(array, count) {
    return Random.uniqueItems(array, count, this)
  }

  /**
   * From a given array, returns an array with the same element, but where the order has been randomized.
   * 
   * Note: the `forcePermutation` option allowsto forbid an item to stay at the same index (what remains possible with true random).
   * @param {any[]} array 
   * @param {{ forcePermutation?: boolean }} param1 
   * @param {*} scope 
   */
  static shuffle(array, { forcePermutation = false } = {}, scope = Random) {

    const max = array.length

    if (max === 0) {
      return []
    }

    if (max === 1) {
      return [array[0]]
    }

    if (forcePermutation && max === 2) {
      const [item0, item1] = array
      return [item1, item0]
    }
    
    if (forcePermutation && max > 2) {
      const tmp = array.map((_, i) => i)
      const result = new Array(max)
      for (let index = 0; index < max; index += 1) {
        const length2 = tmp.length
        let index2 = scope.index(length2)
        let index3 = tmp[index2]
        while (index3 === index) {
          if (length2 > 1) {
            index2 = scope.index(length2)
            index3 = tmp[index2]
          } else {
            // NOTE: read it carefully, this is non-trivial
            // What is the problem here?
            // The last item will be the same in the result than in source (array).
            // This is because there is no other option from the remaining items (tmp, which contains only one element now).
            // If so, we permute the last item with a random one from the current result (minus one, of course).
            // Doing this way, we are certain that the last item will be anything except the last item from source.
            index3 = scope.index(array.length - 1)
            result[index] = result[index3]
            result[index3] = array[index]
            return result
          }
        }
        tmp.splice(index2, 1)
        result[index] = array[index3]
      }
      return result
    }

    const result = [...array]
    for (let index = 0; index < max; index += 1) {
      const index2 = scope.index(max)
      const tmp = result[index]
      result[index] = result[index2]
      result[index2] = tmp
    }
    return result
  }

  shuffle(array, { forcePermutation = false } = {}) {
    return Random.shuffle(array, { forcePermutation }, this)
  }
}