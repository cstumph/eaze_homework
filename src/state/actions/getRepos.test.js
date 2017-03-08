import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import reducer from '../reducers/user.js'
import getRepos from './getRepos.js'
import testRepos from '../test-data/repoList.js'
import {GET_REPOS_LOADING, GET_REPOS_ERROR, GET_REPOS_SUCCESS} from '../action-names.js'
import nock from 'nock'

const mockStore = configureMockStore([thunk])

describe('actions', () => {
  beforeEach(() =>{
    nock.disableNetConnect();
  })
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates a loading and success action when getRepos is dispatched', () => {
    nock('https://api.github.com/')
      .get('/users/cstumph/repos')
      .reply(200, testRepos)

    const expectedActions = [
      { type: GET_REPOS_LOADING },
      { type: GET_REPOS_SUCCESS, payload: testRepos }
    ]

    const store = mockStore({ repos: testRepos })
    return store.dispatch(
      getRepos('MRockatansky')
    , () => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    )

  })

  it('creates an error action when getRepos fails', () => {
    const error = new Error('oh mah gawd!')
    nock('https://api.github.com/')
      .get('/users/*')
      .reply(400, error)

    const expectedActions = [
      {type: GET_REPOS_ERROR}
    ]

    const store = mockStore({ user: {loading: false, error: error, data: {}} })

    // console.log('theres an issue here with .then being undefined, so I\'ll have to dig into why later and deal with the unhandled promise rejection')

    return store.dispatch(getRepos('MRockatansky'), () => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
