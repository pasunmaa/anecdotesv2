const initialMessage = 'All Good!'

export const notificationSet = (content) => {
  //console.log(content)
  return {
    type: 'SET',
    data: content,
  }
}

export const notificationReset = () => {
  return {
    type: 'RESET',
    data: '',
  }
}

const reducer = (store = initialMessage, action) => {
  //console.log(action)
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