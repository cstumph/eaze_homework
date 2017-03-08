import immutable from 'immutable'
import {
  GET_REPOS_LOADING
, GET_REPOS_SUCCESS
, GET_REPOS_ERROR
} from './../action-names.js'

const nullData = {
  loading: false
, error: false
, data: []
}
const init = immutable.fromJS(nullData)

export default (state = init, {type, payload, error, meta} = {}) => {
  switch (type){
    case GET_REPOS_LOADING:
      return state.merge({
        ...nullData
      , loading: true
      , data: state.get('data') || nullData.data
      })
    case GET_REPOS_SUCCESS:
      return state.merge({
        ...nullData
      , data: payload
      })
    case GET_REPOS_ERROR:
      return state.merge({
        ...nullData
      , error: payload
      , data: state.get('data') || nullData.data
      })
    default: return state
  }
}