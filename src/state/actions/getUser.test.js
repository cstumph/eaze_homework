import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import reducer from '../reducers/user.js'
import getUser from './getUser.js'
import testUser from '../test-data/user.js'
import {GET_USER_LOADING, GET_USER_ERROR, GET_USER_SUCCESS} from '../action-names.js'
import nock from 'nock'


const mockStore = configureMockStore([thunk])

describe('actions', () => {
  beforeEach(() =>{
    nock.disableNetConnect();
  })
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates a loading and success action when getUsers is dispatched', () => {
    nock('https://api.github.com/')
      .get('/users/*')
      .reply(200, testUser)

    const expectedActions = [
      { type: GET_USER_LOADING },
      { type: GET_USER_SUCCESS, payload: testUser }
    ]

    const store = mockStore({ user: testUser })
    return store.dispatch(
      getUser('MRockatansky')
    , () => {
        expect(store.getActions()).toEqual(expectedActions)
      }
    )

  })

  it('creates an error action when getUsers fails', () => {
    const error = new Error('oh mah gawd!')
    nock('https://api.github.com/')
      .get('/users/*')
      .reply(400, error)

    const expectedActions = [
      {type: GET_USER_ERROR}
    ]

    const store = mockStore({ user: {loading: false, error: error, data: {}} })

    return store.dispatch( getUser('MRockatansky'), () => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
