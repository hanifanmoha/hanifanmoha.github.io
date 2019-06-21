import styles from './Pokedex.scss'
import React from 'react'
import cx from 'classnames'

const Pokedex = (props) => {
  let {
    className
  } = props

  return (
    <div className={cx(className, styles.root)}>
    </div>
  );
}

export default Pokedex;