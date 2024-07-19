import pokedex from '../data/pokedex'
import items from '../data/items'
import skills from '../data/skills'
import types from '../data/types'

const get = (type) => {
  switch (type) {
    case 'pokedex':
      return pokedex
    case 'items':
    return items
    case 'skills':
    return skills
    case 'types':
    return types
    default:
      break;
  }
}

export {
  get
}