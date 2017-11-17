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
import { withRouter } from 'dva/router';
import './App.less';

class App extends Component {
    constructor(props) {
		super(props);
		console.log(props);
    }
    render() {
    	return (
      		<div>
            	app
            	<div>{ this.props.children }</div>
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
