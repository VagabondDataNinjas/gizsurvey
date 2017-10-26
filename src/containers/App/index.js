/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Survey from 'containers/Survey/Loadable';

export default function App() {
  return (
    <Switch>
      <Route component={Survey} />
    </Switch>
  );
}
