import React from 'react'
import { shallow, mount } from 'enzyme'
import {App} from './App'
import Immutable from 'immutable'

//Fixtures
import user from './state/test-data/user.js'
const userStoreMock = Immutable.fromJS({loading: false, error: false, data: user})

import repos from './state/test-data/repoList.js'
const reposStoreMock = Immutable.fromJS({loading: false, error: false, data: repos})

it('shallow renders without errors', () => {
  const component = shallow(<App repos={reposStoreMock} user={userStoreMock}/>)
  shallow(<App repos={reposStoreMock} user={userStoreMock}/>)
})

it('correctly maps state to props', () => {
  const component = mount(<App repos={reposStoreMock} user={userStoreMock}/>)
  expect(component.props().user).toEqual(userStoreMock)
  expect(component.props().repos).toEqual(reposStoreMock)
})

it('populates form input when user prop supplied', () => {
  const component = shallow(<App repos={reposStoreMock} user={userStoreMock}/>)
  expect(component.find('input[name="username"]')).toHaveValue('cstumph')
})
