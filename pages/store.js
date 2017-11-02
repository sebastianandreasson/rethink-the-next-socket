import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
const socket = require('socket.io-client')(`http://localhost:1339`)

const initialState = {
  points: []
}

export const actionTypes = {
  MOVE: 'MOVE',
  GET: 'GET',
  UPDATE: 'UPDATE'
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVE:
      return Object.assign({}, state, { position: action.data })
    case actionTypes.GET:
      return { ...state, points: action.data }
    case actionTypes.UPDATE:
      return {
        ...state,
        points: state.points.map(p => {
          if (p.id === action.data.id) {
            p = action.data
          }
          return p
        })
      }
    default:
      return state
  }
}

// ACTIONS
export const move = position => dispatch => {
  return dispatch({ type: actionTypes.MOVE, data: position })
}

export const get = () => dispatch => {
  socket.emit('get', points =>
    dispatch({ type: actionTypes.GET, data: points })
  )
}

export const feed = () => dispatch => {
  socket.emit('feed', () => {
    socket.on('update', point => dispatch({ type: actionTypes.UPDATE, data: point }))
  })
}

export const initStore = (state = initialState) => {
  return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
