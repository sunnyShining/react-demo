import React from 'react';
import { Route, Switch, routerRedux, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import IndexPage from '../container/IndexPage/IndexPage.jsx';
import App from '../container/App/App.jsx';

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
	console.log(app);
	const error = dynamic({
		app,
		component: () => import('../container/Error/Error.jsx'),
	});
	const routes = [
	    {
		path: '/indexPage',
		    models: () => [import('../models/indexPage.js')],
	        component: () => import('../container/IndexPage/IndexPage.jsx'),
	    },
	];
    return (
      <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/indexPage" />)} />
            {
            	routes.map(({ path, ...dynamics }, key) => (
              		<Route key={key}
                	exact
                	path={path}
                	component={dynamic({
                 		app,
                  		...dynamics,
                	})}
              		/>
            	))
          	}
            <Route component={error} />
          </Switch>
        </App>
      </ConnectedRouter>
    );
}

export default RouterConfig;
