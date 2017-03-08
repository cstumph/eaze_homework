import React, {Component} from 'react'
import IPropTypes from 'react-immutable-proptypes'
import {connect} from 'react-redux'
import getRepos from './state/actions/getRepos.js'
import getUser from './state/actions/getUser.js'
import styles from './App.css'

import Header from './components/header/'
import ListItemRepo from './components/list-item-repo/'

const mapState = (state, ownProps) => {
  return {
    repos: state.get('repos')
  , user: state.get('user')
  }
}


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: {
        username: ''
      }
    , repoSort: {
        sortBy: 'stargazers_count'
      , ascending: true
      }
    }
    //TODO: consider using a decorator when this lands: https://github.com/babel/babel/issues/2645
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.setSortMethod = this.setSortMethod.bind(this)
  }

  static propTypes = {
    repos: IPropTypes.map
  , user: IPropTypes.map
  }

  componentWillReceiveProps(newProps) {
    this.rehydrateFormInputState(newProps)
  }

  componentWillMount() {
    this.rehydrateFormInputState(this.props)
  }

  rehydrateFormInputState (newProps){
    const currentUser = newProps.user.getIn(['data', 'login'])

    if (currentUser && !this.state.inputs.username){
      this.setState({
        inputs: {
          username: currentUser
        }
      })
    }
  }

  onInputChange (event){
    const key   = event.target.name
    const value = event.target.value
    this.setState({
      inputs: {
        [key]: value
      }
    })
  }

  onFormSubmit (event){
    event.preventDefault()
    if (this.state.inputs.username){
      this.props.dispatch(getRepos(this.state.inputs.username))
      this.props.dispatch(getUser(this.state.inputs.username))
    }

  }

  setSortMethod (sortOption){
    const statePartial = this.state.repoSort
    if (statePartial.sortBy === sortOption){
      statePartial.ascending = !statePartial.ascending
    }else{
      statePartial.sortBy = sortOption
      statePartial.ascending = true
    }


    this.setState(statePartial)
  }

  sortRepos (repos){
    return repos.sort((a,b) => {
      let sortKey, x, y
      this.state.repoSort.sortBy
      ? sortKey = this.state.repoSort.sortBy
      : sortKey = 'stargazers_count'

      if (this.state.repoSort.ascending){
        y = a.get(sortKey)
        x = b.get(sortKey)
      }else{
        x = a.get(sortKey)
        y = b.get(sortKey)
      }

      if (x < y)   {return -1}
      if (x > y)   {return 1}
      if (x === y) {return 0}
      else return 0
    })
  }

  renderRepoList (repos, sortBy, ascending){
    if (!repos || !repos.size){ return false }
    const listItems = []
    const repoList  = this.sortRepos(repos)
    repoList.forEach((repo, i) => {
      listItems.push(
        <ListItemRepo key={repo.get('id')} repo={repo}/>
      )
    })
    return listItems
  }

  render() {
    const sortBy = this.state.repoSort.sortBy
    const asc = this.state.repoSort.ascending

    return (
      <div className={styles.app}>
        <Header/>
        <div className={styles.pageWrapper}>
          <div className={styles.formWrapper}>
            <p className={styles.appIntro}>Enter a name below to retrieve repos</p>

            {/* TODO: extract form, input, button into components */}
            <form className={styles.form} onSubmit={this.onFormSubmit}>
              <label>
                <span className={styles.labelText}>Username: </span>
                <input
                  name="username"
                  onChange={this.onInputChange}
                  value={this.state.inputs.username}
                  type="text"
                  tabIndex="0">
                </input>
              </label>
              <input type="submit"></input>
            </form>

          </div>

        {/* This relly needs abstracting, but no time left. Please forgive :( */}
        {/* Also, wacky double ternaries, gross, I know. */}
          <div className={styles.sortBar}>
            <span className={styles.sortBarLabel}>Sort by: </span>
            <button
              onClick={() => {this.setSortMethod('stargazers_count')} }
              className={styles.stars}
              title="starred count"
            >⭐️{sortBy ==='stargazers_count' ? asc ? '🔻' : '🔺' : null}
            </button>
            <button
              onClick={() => {this.setSortMethod('open_issues_count')} }
              className={styles.watches}
              title="watch count"
            >❗{sortBy === 'open_issues_count' ? asc ? '🔻' : '🔺' : null}
            </button>
            <button
              onClick={() => {this.setSortMethod('pushed_at')} }
              className={styles.lastUpdate}
              title="last update"
            >
            ⏱{sortBy === 'pushed_at' ? asc ? '🔻' : '🔺' : null}
            </button>
          </div>
          <ul className="repoList">
            {this.renderRepoList(
              this.props.repos.get('data')
            )}
          </ul>

        </div>
      </div>
    )
  }
}

//TODO: consider using decorator when this lands: https://github.com/babel/babel/issues/2645
export default connect(mapState)(App)

//For testing convenience
export {App}
