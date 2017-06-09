export const thunk = store => {  
  const dispatch = store.dispatch
  const getState = store.getState

  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    console.log(action)
    return next(action)
  }
}