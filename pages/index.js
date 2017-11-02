import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, move } from './store'
import withRedux from 'next-redux-wrapper'

import Start from './views/Start'

class Index extends React.Component {
  render () {
    const { move } = this.props

    return (
      <div>
        <button onClick={() => move({ x: Math.random() * 100, y: Math.random() * 100 })}>
          move
        </button>
        <Start />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    move: bindActionCreators(move, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Index)
