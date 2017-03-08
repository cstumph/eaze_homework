import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import ListItemRepo from './index.js'
import repoList from '../../state/test-data/repoList.js'

const repo = Immutable.fromJS(repoList[0])

it('renders without crashing', () => {
  shallow(<ListItemRepo repo={repo} />)
})
