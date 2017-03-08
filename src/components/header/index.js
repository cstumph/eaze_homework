import React, {Component} from 'react'
import logo from '../../../assets/logo2.svg'
import styles from './index.css'

class Header extends Component {
  render() { return(
    <div className={styles.AppHeader}>
      <img src={logo} className={styles.AppLogo} alt="logo" />
    </div>
  )}
}
export default Header