import reducer from './user.js'
import * as types from '../action-names.js'
import Immutable from 'immutable'

describe('user reducer', () => {

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      Immutable.fromJS({
        loading: false
      , error: false
      , data: {}
      })
    )
  })

  it('should handle GET_USER_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.GET_USER_SUCCESS
      , payload: {user: 'hello'}
      })
    ).toEqual(
      Immutable.fromJS({
        loading: false
      , error: false
      , data: {user: 'hello'}
      })
    )
  })

  it('should handle GET_USER_LOADING', () => {
    expect(
      reducer(undefined, {
        type: types.GET_USER_LOADING
      })
    ).toEqual(
      Immutable.fromJS({
        loading: true
      , error: false
      , data: {}
      })
    )
  })

  it('should handle GET_USER_ERROR', () => {
    expect(
      reducer(undefined, {
        type: types.GET_USER_ERROR
      , payload: 'oh noes!'
      })
    ).toEqual(
      Immutable.fromJS({
        loading: false
      , error: 'oh noes!'
      , data: {}
      })
    )
  })

})