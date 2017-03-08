import GH from 'github-api'

import {
  GET_USER_LOADING
, GET_USER_ERROR
, GET_USER_SUCCESS
} from '../action-names.js'


const loading = () => {
  return {
    type: GET_USER_LOADING
  }
}
const error = (payload) => {
  return {
    type: GET_USER_ERROR
  , payload
  }
}
const success = (payload) => {
  return {
    type: GET_USER_SUCCESS
  , payload
  }
}
const fetchUser = (username, cb) => {
  //This should at least be throttled with an increasing delay after several req/sec to avoid hitting the github rate limit
  //Additionally we could also write an action to fetch the allowance and display it in app.
  const ghUser = new GH().getUser(username)
  ghUser.getProfile()
  .then( function gotUser (user){
    console.log('GOT USER', user.data)
    cb(null, user.data)
  })
  .catch( function gotUserFail (err){
    console.log('GOT ERR', err)
    cb(err, null)
  })
}

export default (username) => {
  return (dispatch, getState) => {
    if (!username){
      dispatch(error( new Error('action getUser: no username arg supplied') ))
      return
    }

    dispatch(loading())

    fetchUser(username, (err, user) => {
      err
      ? dispatch(error(new Error(err)))
      : dispatch(success(user))
    })
  }
}
export {loading, error, success, fetch}
