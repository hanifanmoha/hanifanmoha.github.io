import styles from './Container.scss'
import React from 'react'
import cx from 'classnames'

const Container = ({ className, children }) => {
  return (
    <div className={cx(className, styles.root)}>
      {children}
    </div>
  );
}

export default Container;