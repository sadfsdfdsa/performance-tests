/**
 * @deprecated - enums are worst
 */
enum Test {
  length = 'length'
}

/**
 * * Recommended to use
 */
const TestConst = {
  length: 'length'
} as const