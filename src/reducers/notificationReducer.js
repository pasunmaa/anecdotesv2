const initialMessage = 'All Good!'
const emptymsg = ''

export const actionFor = {
  notificationSet(content) {
    //console.log(content)
    return {
      type: 'SET',
      data: content,
    }
  },
  notificationReset() {
    return {
      type: 'RESET',
      data: emptymsg,
    }
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
    return newMessage
  default:
    return store
  }
}

export default reducer