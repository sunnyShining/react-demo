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
