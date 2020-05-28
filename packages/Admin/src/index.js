import React from "react";
import ReactDOM from "react-dom";

import NextApp from './NextApp';
import registerServiceWorker, {unregister} from './registerServiceWorker';
// Add this import:
import {AppContainer} from 'react-hot-loader';
import {message} from 'antd'
message.config({
  top: 100,
  duration: 2,
  maxCount: 1,
})

// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <NextApp/>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Do this once
unregister();

// Render once
render(NextApp);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./NextApp', () => {
    render(NextApp);
  });
}
