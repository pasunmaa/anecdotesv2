export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

const filterReducer = (state = 'ALL', action) => {
  //console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_FILTER':
    return action.filter
  case 'ALL':
    return ''
  default:
    return ''
  }
}

export default filterReducer