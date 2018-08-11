const initialMessage = 'All Good!'

export const showNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      data: message
    })
    window.setTimeout(() => {
      dispatch({
        type: 'RESET',
        data: ''
      })
    },
    time * 1000
    )
  }
}

const reducer = (store = initialMessage, action) => {
  let newMessage = ''
  switch (action.type) {
  case 'SET':
    newMessage = action.data
    return newMessage
  case 'RESET':
    newMessage = action.data
    return newMessage
  default:
    return store
  }
}

export default reducer