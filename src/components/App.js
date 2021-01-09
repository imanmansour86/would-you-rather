import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Questions from './Questions'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import Navigation from './Navigation'
import NoMatch from './NoMatch'
import '../App.css';
import LoadingBar from 'react-redux-loading'
import QuestionHome from './QuestionHome'

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleInitialData())
  }


  render() {
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
                <Route path='/question/:id' exact component={QuestionHome} />
                <Route path="*" component={NoMatch} />
              </Switch>
            </div> : <Login />}
        </Fragment>
      </Router>
    )
  }
}


function mapStateToProps({ authedUser }) {

  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
