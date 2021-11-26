import { trackPerformance } from './performanceWrapper.mjs'

const obj = {}

for (let i = 0; i < 1000; i++) {
  obj[`${i}`] = Math.random().toString()
}

const safeHasOwnProp = () => {
  const r = []
  for (const k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue
    r.push(k)
  }
  return r
}

const hasOwnProp = () => {
  const r = []
  for (const k in obj) {
    if (!Object.prototype.hasOwnProperty(obj, k)) continue
    r.push(k)
  }
  return r
}

const objectKeys = () => {
  return Object.keys(obj)
}

const objectEntries = () => {
  return Object.entries(obj).map(([k, v]) => k)
}

const cases = {
  safeHasOwnProp,
  hasOwnProp,
  objectKeys,
  objectEntries,
}

console.log('Get object keys...\n')

Object.entries(cases).forEach(([n, f]) => {
  trackPerformance(f, n)
})
