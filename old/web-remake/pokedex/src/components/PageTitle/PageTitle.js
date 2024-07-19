import styles from './PageTitle.scss'
import React from 'react'
import cx from 'classnames'

const PageTitle = ({ className, children }) => {
  return (
    <div className={cx(className, styles.root)}>
      <h1 className={styles.title}>{children}</h1>
      <hr className={styles.hr} />
    </div>
  );
}

export default PageTitle;