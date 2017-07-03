
// Note: This middleware looks for 'actions' that are really functions
// and provides them a dispatch (and getState) so they can perform some 
// asychronous activty and dispatch an action when it completes.
// We could use redux-thunk instead of writing our own.

const thunk = store => {  
  const dispatch = store.dispatch
  const getState = store.getState

  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    return next(action)
  }
};

export default thunk;
