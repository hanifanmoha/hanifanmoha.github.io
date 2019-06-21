import styles from './PokeCard.scss'
import React from 'react'
import cx from 'classnames'

import targetIcon from './target.svg'

const PokeCard = ({ className, data }) => {

  let img;
  try {
    let ename = data.ename
        .replace(/[^\x00-\x7F]/g, "")
        .replace(/\./,'_')
        .replace(/\s/,'')
        .replace(/\'/,'')
    img = require(`../../../data/thm/${data.id}${ename}.png`)
  } catch (e) {

  }

  return (
    <li className={cx(className, styles.root)}>
      <div className={styles.ballContainer}>
        <img src={targetIcon} className={styles.ball} />
      </div>
      <div className={styles.pokeImage} style={{ backgroundImage: `url(${img})` }} />
      <div className={styles.pokeData}>
        <h3 className={styles.name}>{data.ename}</h3>
        <h3 className={styles.cname}>{data.cname}</h3>
      </div>
    </li>
  );
}

export default PokeCard;