import styles from './Layout.scss'
import React from 'react'
import cx from 'classnames'

import '../../scss/index.scss'

import Navbar from '../Navbar/Navbar';
import Container from '../Container/Container';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className={cx(styles.root)}>
      <Navbar />
      <Container className={styles.content}>
        {children}
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;