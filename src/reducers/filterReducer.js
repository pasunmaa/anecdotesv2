export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter: filter.toLowerCase()
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return action.filter
  case 'ALL':
    state = ''
    return ''
  default:
    return state
  }
}

export default filterReducer