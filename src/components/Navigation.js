import React from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'

const { SubMenu } = Menu;

class Navigation extends React.Component {

  handleLogout = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(null))
  }

  render() {
    const { user } = this.props
  
    return (
      <nav className='nav'>
        <Menu selectedKeys={[]} mode="horizontal">
          <Menu.Item key="home ">
            <NavLink to='/' exact activeClassName='active'>
              Home
           </NavLink>
          </Menu.Item>
          <Menu.Item key="New Question">
            <NavLink to='/add' activeClassName='active'>
              New Question
           </NavLink>
          </Menu.Item>
          <Menu.Item key="Leader Board">
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
           </NavLink>
           </Menu.Item>

           <Menu.Item key="Logout" style = {{float : "right"}}>
            <a className='logout' onClick={(e) => this.handleLogout(e)}>Logout</a>
            </Menu.Item>
            <Menu.Item key="user" style = {{float : "right"}}>
            Hello, {user.name} <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar' style={{ width: 20 }} />
          </Menu.Item>
        </Menu>
      </nav>
    );
  }
}

function mapStateToProps({ users, authedUser }) {

  const user = users[authedUser.id]

  return {
    user

  }
}

export default connect(mapStateToProps)(Navigation)