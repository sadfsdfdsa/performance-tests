import { trackAveragePerformance } from './performanceWrapper.mjs'

const obj = {
  test: 'test',
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

trackAveragePerformance(executeTestCase1, 'hasOwnProperty', 'heapUsed', 10)
trackAveragePerformance(executeTestCase2, 'keys -> includes', 'heapUsed', 10)
trackAveragePerformance(executeTestCase3, '!!OBJ[KEY]', 'heapUsed', 10)
