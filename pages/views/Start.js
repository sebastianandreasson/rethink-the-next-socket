import { connect } from 'react-redux'
import withDragDropContext from '../dndContext'
import { DropTarget } from 'react-dnd'
import Points from './Points'

const pointTarget = {
  drop: (props, monitor, component) => {
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
  movePoint(item, x, y) {
    const { move } = this.props
    move({ id: item.id, x, y })
    console.log('movePoint', item, x, y)
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
