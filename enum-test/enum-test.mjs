import { trackPerformance } from '../performanceWrapper.mjs'

const enuming = () => {
  var Test
  ;(function (Test) {
    Test['length'] = 'length'
  })(Test || (Test = {}))
  return Test
}

const constant = () => {
  var TestConst = {
    length: 'length',
  }
  return TestConst
}

trackPerformance(enuming, 'Enum', 'heapUsed')
trackPerformance(constant, 'Const', 'heapUsed')
