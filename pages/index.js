import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, get, move, feed } from './store'
import withRedux from 'next-redux-wrapper'

import Start from './views/Start'

class Index extends React.Component {
  componentDidMount() {
    const { get, feed } = this.props
    get()
    feed()
  }

  render () {
    const { move } = this.props
    return (
      <div>
        <Start move={move} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    move: bindActionCreators(move, dispatch),
    get: bindActionCreators(get, dispatch),
    feed: bindActionCreators(feed, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Index)
