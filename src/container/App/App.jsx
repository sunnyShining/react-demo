/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2017-11-17 09:58:18
 * @modify date 2017-11-17 09:58:18
 * @desc 入口页面
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { withRouter } from 'dva/router';
import './App.less';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class App extends Component {
    constructor(props) {
		super(props);
		console.log(props);
    }
    render() {
    	return (
      		<div>
        		<Layout>
          			<Header className="header">
            			<div className="logo">1213</div>
          			</Header>
          			<Layout>
            			<Sider>Sider</Sider>
            			<Content>
              				<div>{ this.props.children }</div>
            			</Content>
          			</Layout>
          			<Footer>Footer</Footer>
        		</Layout>
      		</div>
      );
    }
}


App.propTypes = {
  children: PropTypes.element.isRequired,
  // location: PropTypes.object,
  // dispatch: PropTypes.func,
  // app: PropTypes.object,
  // loading: PropTypes.object,
};

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App));
