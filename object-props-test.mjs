import { trackPerformance } from './performanceWrapper.mjs'

// const propsNumber = 1000 * 1000 * 1

// const objectTest = {}

// const filler = () => {
//   for (let index = 0; index < propsNumber; index++) {
//     const key = `prop${index + 1}`
//     const value = `value${index + 1}`
//     objectTest[key] = value
//   }
// }

// filler()

const obj = {
  test: 'test'
}

const executeTestCase1 = () => {
  return Object.prototype.hasOwnProperty.call(obj, 'test')
}

const executeTestCase2 = () => {
  return Object.keys(obj).includes('test')
}

const executeTestCase3 = () => {
  return !!obj['test']
}

trackPerformance(executeTestCase1, 'hasOwnProperty', 'heapUsed')
trackPerformance(executeTestCase2, 'keys -> includes', 'heapUsed')
trackPerformance(executeTestCase3, '!!OBJ[KEY]', 'heapUsed')
