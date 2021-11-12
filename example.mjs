import {
  trackPerformance,
  trackAveragePerformance,
} from './performanceWrapper.mjs'

const fn = () => console.log('Lets track it!')

trackAveragePerformance(fn, 'track it', 'heapUsed', 1000)
trackPerformance(fn, 'track it')