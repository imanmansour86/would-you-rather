import { combineReducers } from 'redux'
import users from './users'
import questions from './questions'
import authedUsers from './authedUsers'

export default combineReducers({ 
    users, 
    authedUsers,
    questions,
})

