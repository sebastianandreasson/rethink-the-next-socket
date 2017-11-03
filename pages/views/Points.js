import { connect } from 'react-redux'
import Point from '../components/Point'

class Points extends React.Component {
  render() {
    const { points } = this.props
    return (
      <div>
        {points.map(p => <Point key={`Point_${p.id}`} {...p} />)}
      </div>
    )
  }
}

export default connect(state => state)(Points)
