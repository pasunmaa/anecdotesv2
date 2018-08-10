import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.filterChange(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

/* const mapStateToProps = (state) => {
  //console.log(state)
  return {
    filter: state.filter,
    //notification: state.notification,
    //anecdotes: state.anecdotes
  }
} */

const mapDispatchToProps = { filterChange }

export default connect(
  null, //mapStateToProps,
  mapDispatchToProps
)(Filter)