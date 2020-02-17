/* global jest describe test expect */

import { initLogger } from '../../utils/logger'

describe('[Util]:logger', () => {
  let _DEBUG
  console.log = jest.fn()

  test('it inits correctly when no _DEBUG value', () => {
    const _log = initLogger(_DEBUG)
    _log()
    expect(console.log).toHaveBeenCalledTimes(0)
  })

  test('it inits correctly with a _DEBUG value and no component)', () => {
    _DEBUG = 1
    const _log = initLogger(_DEBUG)
    _log(undefined, 'Message')
    expect(console.log).toHaveBeenCalledWith('[undefined]', 'Message')
  })

  test('it inits correctly with a _DEBUG value and no message)', () => {
    _DEBUG = 1
    const _log = initLogger(_DEBUG)
    _log('Component')
    expect(console.log).toHaveBeenCalledWith('[Component]')
  })

  test('it inits correctly with a _DEBUG value)', () => {
    _DEBUG = 1
    const _log = initLogger(_DEBUG)
    _log('Component', 'Message')
    expect(console.log).toHaveBeenCalledWith('[Component]', 'Message')
  })
})
