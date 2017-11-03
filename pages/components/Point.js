import React from 'react'
import { DragSource } from 'react-dnd'

const pointSource = {
  beginDrag(props) {
    console.log('beginDrag', props)
    return { ...props }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Point extends React.Component {
  render() {
    const { x, y, connectDragSource } = this.props
    return connectDragSource(
      <div style={{ left: x, top: y, ...styles.point }}>

      </div>
    )
  }
}

const styles = {
  point: {
    position: 'absolute',
    width: '25px',
    height: '25px',
    backgroundColor: 'green',
    borderRadius: '50%'
  }
}

export default DragSource('POINT', pointSource, collect)(Point)
