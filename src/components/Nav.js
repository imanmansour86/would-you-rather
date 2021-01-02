import React, { Component } from 'react'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Nav extends React.Component {
 
  render() {
  
    return (
      <Menu selectedKeys={[]} mode="horizontal">
        <Menu.Item key="home">
          Home
        </Menu.Item>
        <Menu.Item key="New Question">
          New Question
        </Menu.Item>
        <Menu.Item key="Leader Board">
          Leader Board
        </Menu.Item>
      </Menu>
    );
  }
}

export default Nav