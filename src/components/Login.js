import React, { Component } from 'react'
import { connect } from 'react-redux';
import Question from './Question'
import { Select } from 'antd';
import { setAuthedUser } from '../actions/authedUser'

const { Option } = Select;

class Login extends Component {

handleChange = (id) => {
const { dispatch } = this.props
console.log('e is ', id)
dispatch(setAuthedUser({id}))
}

render() {
    console.log('test',this.props)

    return(

        <div>
            <h1>Welcome to Would You Rather App!</h1>
            <h1>Please sign in to continue</h1>

            <h3>Sign in</h3>

        <Select placeholder="Choose a Name" style={{ width: 200 }} onChange={this.handleChange}>
        {this.props.users.map((user)=>
      <Option key = {user.id} value = {user.id}>
          <img src = {user.avatarURL} style = {{width: 20, padding: 2} }/>
          {user.name}</Option>)}
    
        </Select>




        </div>

    )
}


}

function mapStateToProps({users}) { 
    return {
        users: Object.values(users)
     
    }
}


export default connect(mapStateToProps)(Login)