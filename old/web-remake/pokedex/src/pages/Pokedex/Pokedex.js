import styles from './Pokedex.scss'
import React from 'react'
import cx from 'classnames'

import Layout from '../../components/Layout/Layout'
import PageTitle from '../../components/PageTitle/PageTitle';

import { get } from '../../../api/api'
import PokeCard from '../../components/PokeCard/PokeCard';

const Pokedex = ({ pokedex }) => {
  return (
    <Layout>
      <div className={cx(styles.root)}>
        <PageTitle>All Pokemon</PageTitle>
        <ul className={cx(styles.row)}>
          {pokedex.map(data => {
            return <PokeCard key={data.id} data={data} className={styles.item}/>
          })}
        </ul>
      </div>
    </Layout>
  );
}

Pokedex.getInitialProps = function () {
  let pokedex = get('pokedex')
  return {
    pokedex
  }
}

export default Pokedex;