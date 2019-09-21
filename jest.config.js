const TEST_REGEX = '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$'

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testRegex: TEST_REGEX,
  transform: { '^.+\\.tsx?$': 'babel-jest' },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false
}
