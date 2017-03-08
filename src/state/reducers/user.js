import immutable from 'immutable'
import {
  GET_USER_LOADING
, GET_USER_SUCCESS
, GET_USER_ERROR
} from './../action-names.js'

const nullData = {
  loading: false
, error: false
, data: {}
}
const init = immutable.fromJS(nullData)

export default (state = init, {type, payload, error, meta} = {}) => {
  switch (type){
    case GET_USER_LOADING:
      return state.merge({
      ...nullData
      , loading: true
      , data: state.get('data') || nullData.data
      })
    case GET_USER_SUCCESS:
      return state.merge({
        ...nullData
      , data: payload
      })
    case GET_USER_ERROR:
      return state.merge({
        ...nullData
      , error: payload
      , data: state.get('data') || nullData.data
      })
    default: return state
  }
}