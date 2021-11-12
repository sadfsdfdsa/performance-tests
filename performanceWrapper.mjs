/**
 * @author Artem Shuvaev
 * ! Example usage:
 *  * cli:
 *    node --expose-gc file.mjs
 *
 *  * file.mjs:
 *    import { trackPerformance } from './performanceWrapper.mjs'
 *    const fn = () => console.log('Lets track it!')
 *    trackPerformance(fn, 'track it')
 *
 *  * output:
 *    Lets track it!
 *    track it: 1.201ms
 *    track it heapTotal: 0mb
 */

import { performance } from 'perf_hooks'

console.warn('Memory usage metrics are still beta \n')
const formatMb = (memory) => Math.abs(memory / 1024 / 1024)

/**
 * Track the perf!
 * @see https://stackoverflow.com/questions/20018588/how-to-monitor-the-memory-usage-of-node-js
 * @param {Function} fn
 * @param {string} trackerName
 * @param {'rss'|'heapTotal'|'heapUsed'|'external'} metric - heapTotal default
 * @param {boolean} log - use logger
 * @returns result of fn
 */
export const trackPerformance = (
  fn,
  trackerName,
  metric = 'heapTotal',
  log = true
) => {
  if (global.gc) {
    global.gc()
  } else {
    console.warn(
      `It's can has errors in memory metrics,
       prefer usage node with 'node --expose-gc file.mjs' flag`
    )
  }

  const startedMemory = process.memoryUsage()[metric]
  const beginTime = performance.now()

  const result = fn()

  const totalTime = performance.now() - beginTime
  log && console.log(`${trackerName}: ${totalTime}ms`)

  const endMemory = process.memoryUsage()[metric] - startedMemory
  const formattedMemory = formatMb(endMemory)
  log && console.log(`${trackerName} ${metric}: ${formattedMemory}mb \n`)

  return [result, formattedMemory, totalTime]
}

/**
 * Avg tracker
 * @beta - it's WIP method
 * @param {Function} fn
 * @param {string} trackerName
 * @param {'rss'|'heapTotal'|'heapUsed'|'external'} metric - heapTotal default
 * @param {number} times - default 100
 * @returns [avgMemoryMb, avgTimeMS]
 */
export const trackAveragePerformance = (
  fn,
  trackerName,
  metric = 'heapTotal',
  times = 100
) => {
  if (global.gc) {
    global.gc()
  } else {
    console.warn(
      `It's can has errors in memory metrics,
       prefer usage node with 'node --expose-gc file.mjs' flag`
    )
  }

  let sumMemory = 0
  let sumTime = 0

  for (let index = 0; index < times; index++) {
    const [_, memory, time] = trackPerformance(fn, trackerName, metric, false)
    sumMemory += memory
    sumTime += time
  }

  const avgMemory = sumMemory / times
  const avgTime = sumTime / times
  console.log(
    `AVG for ${times} times
     memory: ${avgMemory}mb
     time: ${avgTime}ms\n`
  )
  return [avgMemory, avgTime]
}
