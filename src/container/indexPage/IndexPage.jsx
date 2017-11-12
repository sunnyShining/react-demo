import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Menu, Icon } from 'antd';
import services from '../../services/services';
import './IndexPage.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class IndexPage extends Component {
    state = {
        current: 'mail',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    testMock = () => {
        services.users().then((data) => {
            console.log(data);
        }, error => {
            console.log(error);
        });
    }
    render() {
        return (
          <div>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
              <Menu.Item key="mail">
                <Icon type="mail" />Navigation One
              </Menu.Item>
              <Menu.Item key="app" disabled>
                <Icon type="appstore" />Navigation Two
              </Menu.Item>
              <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
                <MenuItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
              <Menu.Item key="alipay">
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
              </Menu.Item>
            </Menu>
            <Button type="primary" onClick={this.testMock}>测试mock数据</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
          </div>
        );
    }
}

// IndexPage.propTypes = {
// };

export default connect()(IndexPage);
