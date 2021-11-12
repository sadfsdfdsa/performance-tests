import { trackPerformance } from './performanceWrapper.mjs'

const propsNumber = 1000 * 1000 * 10

const arrayTest = []

const filler = () => {
  for (let index = 0; index < propsNumber; index++) {
    const value = `value${index + 1}`
    arrayTest.push(value)
  }
}

filler()

// ! Always better at large collections
const executeTestCase1 = () => {
  const cache = []
  for (let index = 0; index < arrayTest.length; index++) {
    cache.push(arrayTest[index])
  }
}

// medium speed, not recommended
const executeTestCase2 = () => {
  const cache = []
  arrayTest.forEach(element => {
    cache.push(element)
  });
}

// ! Better at small collections
const executeTestCase3 = () => {
  const cache = []
  for (const iterator of arrayTest) {
    cache.push(iterator)
  }
}

const executeTestCase4 = () => {
  const cache = []
  for (const iterator in arrayTest) {
    cache.push(iterator)
  }
}

trackPerformance(executeTestCase1, 'FOR')
trackPerformance(executeTestCase2, 'ForEach')
trackPerformance(executeTestCase3, 'FOR OF')
trackPerformance(executeTestCase4, 'FOR In')