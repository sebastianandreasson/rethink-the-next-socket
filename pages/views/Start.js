import { connect } from 'react-redux'

export default connect(state => state)(({ points }) => {
  return (
    <div>
      {points.map(({ id, x, y }) =>
        <div key={`Point_${id}`} style={{ left: x, top: y, ...styles.box }}>

        </div>
      )}
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
