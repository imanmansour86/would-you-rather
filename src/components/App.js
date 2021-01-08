import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Questions from './Questions'
import Question from './Question'
import Results from './Results'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import Navigation from './Navigation'
import NoMatch from './NoMatch'
import '../App.css';
import LoadingBar from 'react-redux-loading'

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleInitialData())
  }


  render() {
    
    const { question } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.authedUser ?

            <div>
              <Navigation />
              <Switch>
              <Route path='/add' component={NewQuestion} />
              <Route path='/leaderboard' component={LeaderBoard} />
              <Route path='/' exact component={Questions} />
              <Route path='/result/:id' component={Results} />
              <Route path='/question/:id' exact component={Question} />
              <Route path="*" component= {NoMatch} />

              </Switch>
              
             
            </div> : <Login />}
        </Fragment>
      </Router>


    )
  }
}


function mapStateToProps({ authedUser, questions }) {
  
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
