import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import QuestionCard from './QuestionCard'
import Question from './QuestionCard'
import NewQuestion from './NewQuestion'
import Nav from './Navigation'
import '../App.css';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleInitialData())
  }


  render() {
    console.log('App', this.props)
    return (

      <div>
        <Nav />
        {this.props.authedUser
          ? <Question/>
          : <Login />}
      </div>


    )
  }
}


function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
