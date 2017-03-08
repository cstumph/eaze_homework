import React, {Component} from 'react'
import styles from './index.css'
import IPropTypes from 'react-immutable-proptypes'
import moment from 'moment'

class ListItemRepo extends Component {
  static proptypes = {
    repo: IPropTypes.map
  }

  render(){
    const repo = this.props.repo
    const name = repo.get('name')
    const starCount = repo.get('stargazers_count')
    const issueCount = repo.get('open_issues_count')
    const url = repo.get('html_url')
    // Ok yeah, I'm not great with regex and I think moment has a way to do this but quick hack is good enough for a demo project ;)
    const lastUpdate = moment(repo.get('pushed_at')).fromNow(true)
      .replace(/(minutes+?)(s\b|\b)/, 'min')
      .replace(/(hour+?)(s\b|\b)/, 'h')
      .replace(/(day+?)(s\b|\b)/, 'd')
      .replace(/(month+?)(s\b|\b)/, 'm')
      .replace(/(year+?)(s\b|\b)/, 'y')
      .replace(/(a|an)(\b)/, '1')
      .replace(' ', '')

    //Admittedly better to use a table here but flexbox can do the job for the moment.
    return(
      <li className={styles.li}>
        <span className={styles.name}><a href={url}>{name}</a></span>
        <span className={styles.metaWrap}>
          <span className={styles.stars} title="starred count">⭐️ {starCount}</span>
          <span className={styles.watches} title="watch count">❗️ {issueCount}</span>
          <span className={styles.lastUpdate} title="last update">⏱ {lastUpdate}</span>
        </span>
      </li>
    )
  }
}
export default ListItemRepo