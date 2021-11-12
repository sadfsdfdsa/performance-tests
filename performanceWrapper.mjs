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
 * @returns result of fn
 */
export const trackPerformance = (fn, trackerName, metric = 'heapTotal') => {
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
  console.log(`${trackerName}: ${totalTime}ms`)

  const endMemory = process.memoryUsage()[metric] - startedMemory
  const formattedMemory = formatMb(endMemory)
  console.log(`${trackerName} ${metric}: ${formattedMemory}mb \n`)

  return [result, formattedMemory, totalTime]
}
