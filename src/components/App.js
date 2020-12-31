import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import { Button, Menu } from 'antd';
import '../App.css';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleInitialData())
  }


  render() {
 
    return (
      <Login/>

    )
  }



}


function mapStateToProps({ authedUser }) {
  return {
    notLogged: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
