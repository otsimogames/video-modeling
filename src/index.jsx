import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';

otsimo.run(() =>{
  let app = document.querySelector("#app");
  // Carrier DOM object.

  let otsLayout = otsimo.kv.layout;
  // Locatization file layout object.

  app.style.background = otsLayout.background;
  app.style.height = otsimo.height + "px";
  app.style.width = otsimo.width + "px";
  // Initilize app width and height

  render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));
  // Render React app.
});

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const App = require('./app.jsx').default;
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
