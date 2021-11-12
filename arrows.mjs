import { trackPerformance } from './performanceWrapper.mjs'

const length = 1000 * 1000 * 10
const filler = () => Math.random()

// simular
const arrowFunction = () => {
  const cache = []
  for (let index = 0; index < length; index++) {
    cache.push(filler())
  }
}

// simular
function contextFunction() {
  const cache = []
  for (let index = 0; index < length; index++) {
    cache.push(filler())
  }
}

trackPerformance(contextFunction, 'contextFunction')
trackPerformance(arrowFunction, 'arrowFunction')
