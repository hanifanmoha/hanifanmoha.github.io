import styles from './Navbar.scss'
import React from 'react'
import cx from 'classnames'

import Container from '../Container/Container';

const Navbar = () => {
  return (
    <nav className={cx(styles.root)}>
      <Container>
        <div className={styles.navbar}>
          <div className={styles.appname}>
            <span>POKENIP</span>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;