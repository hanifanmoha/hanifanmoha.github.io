import styles from './Footer.scss'
import React from 'react'
import cx from 'classnames'
import Container from '../Container/Container';

const Footer = ({ className }) => {
  return (
    <div className={cx(className, styles.root)}>
      <Container className={cx(styles.footer)}>
        2019
        <hr className={styles.hr} />
      </Container>
    </div>
  );
}

export default Footer;