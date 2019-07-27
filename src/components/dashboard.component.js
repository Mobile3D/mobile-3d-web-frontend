import React from 'react';

import Navbar from './navbar.component';

/**
 * Includes the Navbar can be implemented in every view that needs a navbar
 */
export default function Dashboard(props) {

  return (
    <div>
      <Navbar title={ props.navTitle } selectedPage="not" />
      { props.children }
    </div>
  )
}