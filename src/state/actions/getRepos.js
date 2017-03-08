import GH from 'github-api'

import {
  GET_REPOS_LOADING
, GET_REPOS_ERROR
, GET_REPOS_SUCCESS
} from '../action-names.js'


const loading = () => {
  return {
    type: GET_REPOS_LOADING
  }
}
const error = (payload) => {
  return {
    type: GET_REPOS_ERROR
  , payload
  }
}
const success = (payload) => {
  return {
    type: GET_REPOS_SUCCESS
  , payload
  }
}
const fetchRepos = (username, cb) => {
  //This should at least be throttled with an increasing delay after several req/sec to avoid hitting the github rate limit
  //Additionally we could also write an action to fetch the allowance and display it in app.
  const ghUser = new GH().getUser(username)
  ghUser.listRepos()
  .then( function gotUser (repos){
    console.log('GOT REPOS', repos.data)
    cb(null, repos.data)
  })
  .catch( function gotUserFail (err){
    console.log('GOT ERR', err)
    cb(err, null)
  })
}

export default (username) => {
  return (dispatch, getState) => {
    if (!username){
      dispatch(error( new Error('action getRepos: no username arg supplied') ))
      return
    }

    dispatch(loading())

    fetchRepos(username, (err, repos) => {
      err
      ? dispatch(error(err))
      : dispatch(success(repos))
    })
  }
}
export {loading, error, success}
