import { trackPerformance } from './performanceWrapper.mjs'

const length = 1000 * 1000 * 10
const filler = () => Math.random()

const executeTestCase1 = () => {
  const test = new Array(length).fill(null).map(filler)
  return test
}

// ! Must use
const executeTestCase2 = () => {
  const test = []
  for (let index = 0; index < length; index++) {
    test.push(filler())
  }
  return test
}

trackPerformance(executeTestCase1, 'Fill -> map -> filler')
trackPerformance(executeTestCase2, 'For loop filler')

// executeTestCase1: 990.249ms
// executeTestCase2: 218.396ms
// about ~4,5 times faster with FOR loop