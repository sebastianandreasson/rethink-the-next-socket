import { connect } from 'react-redux'
import withDragDropContext from '../dndContext'
import { DropTarget } from 'react-dnd'
import Points from './Points'

function limit(fn, delay) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}

const pointTarget = {
  drop: (props, monitor, component) => {
    const item = monitor.getItem()
    const delta = monitor.getDifferenceFromInitialOffset()
		const x = Math.round(item.x + delta.x)
		const y = Math.round(item.y + delta.y)

		component.drop(item, x, y)
  },
  hover: (props, monitor, component) => {
    const item = monitor.getItem()
    const delta = monitor.getDifferenceFromInitialOffset()
		const x = Math.round(item.x + delta.x)
		const y = Math.round(item.y + delta.y)

    component.movePoint(item, x, y)
  }
}

const pointConnect = connect => ({
  connectDropTarget: connect.dropTarget()
})

class Start extends React.Component {
  constructor (props) {
    super(props)
    this.move = limit(props.move, 50)
  }

  movePoint(item, x, y) {
    this.move({ id: item.id, x, y })
  }

  drop(item, x, y) {
    const { move } = this.props
    move({ id: item.id, x, y })
  }

  render() {
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div style={styles.root}>
        <Points />
      </div>
    )
  }
}

const styles = {
  root: {
    width: '100vw',
    height: '100vh'
  }
}

export default withDragDropContext(
  DropTarget('POINT', pointTarget, pointConnect)(Start)
)
