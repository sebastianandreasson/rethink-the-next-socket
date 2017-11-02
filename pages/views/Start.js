import { connect } from 'react-redux'

export default connect(state => state.position)(({ x, y }) => {
  return (
    <div>
      <div style={{ left: x, top: y, ...styles.box }}>

      </div>
    </div>
  )
})

const styles = {
  box: {
    position: 'absolute',
    backgroundColor: 'blue',
    width: '10px',
    height: '10px'
  }
}
