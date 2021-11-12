import { trackPerformance } from './performanceWrapper.mjs'

const propsNumber = 1000 * 1000 * 1

const objectTest = {}

const filler = () => {
  for (let index = 0; index < propsNumber; index++) {
    const key = `prop${index + 1}`
    const value = `value${index + 1}`
    objectTest[key] = value
  }
}

filler()

const executeTestCase1 = () => {
  const cache = []
  for (const key in objectTest) {
    const element = objectTest[key]
    cache.push(element)
  }
}

// ! Always better
const executeTestCase2 = () => {
  const cache = []
  for (const iterator of Object.keys(objectTest)) {
    const element = objectTest[iterator]
    cache.push(element)
  }
}

trackPerformance(executeTestCase1, 'FOR IN')
trackPerformance(executeTestCase2, 'FOR OF Object.keys')
