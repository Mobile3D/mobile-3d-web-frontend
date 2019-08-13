import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { apiHelper } from '../helpers/api.helper';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      apiHelper.checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);