import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  position: {
    x: 0,
    y: 0
  }
}

export const actionTypes = {
  MOVE: 'MOVE'
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVE:
      return Object.assign({}, state, { position: action.data })
    default:
      return state
  }
}

// ACTIONS
export const move = position => dispatch => {
  return dispatch({ type: actionTypes.MOVE, data: position })
}

export const initStore = (state = initialState) => {
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
