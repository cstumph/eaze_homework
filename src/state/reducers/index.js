import {createStore, applyMiddleware} from 'redux'
import {compose, combineReducers} from 'redux-immutable'
import thunk from 'redux-thunk'
import {autoRehydrate, persistStore} from 'redux-persist-immutable'

//reducers
import repos from './repos.js'
import user from './user.js'
// import gists from './gists.js'

const mainReducer = combineReducers({
  repos
, user
})

//Enable redux dev tools browser plugin.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  mainReducer
, composeEnhancers(
    applyMiddleware(thunk)
  , autoRehydrate()
  )
)

persistStore(store)

export default store