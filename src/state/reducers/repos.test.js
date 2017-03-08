import reducer from './repos.js'
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
      , data: []
      })
    )
  })

  it('should handle GET_REPOS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.GET_REPOS_SUCCESS,
        payload: [{repo: 'it\'s a good one'}]
      })
    ).toEqual(
      Immutable.fromJS({
        loading: false
      , error: false
      , data: [{repo: 'it\'s a good one'}]
      })
    )
  })

  it('should handle GET_REPOS_LOADING', () => {
    expect(
      reducer(undefined, {
        type: types.GET_REPOS_LOADING
      })
    ).toEqual(
      Immutable.fromJS({
        loading: true
      , error: false
      , data: []
      })
    )
  })

  it('should handle GET_REPOS_ERROR', () => {
    expect(
      reducer(undefined, {
        type: types.GET_REPOS_ERROR,
        payload: 'oh noes!'
      })
    ).toEqual(
      Immutable.fromJS({
        loading: false
      , error: 'oh noes!'
      , data: []
      })
    )
  })

})