import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';
import createjs from 'preload-js';

var preloadQ = new createjs.LoadQueue();
    preloadQ.on("complete", handlePreloaded, this);
// Create preload queue


otsimo.run(() =>{
  let app = document.querySelector("#app");
  // Carrier DOM object.

  let otsLayout = otsimo.kv.layout;
  // Locatization file layout object.

  app.style.background = otsLayout.background;
  app.style.height = otsimo.height + "px";
  app.style.width = otsimo.width + "px";
  // Initilize app width and height

  otsimo.kv.videos.forEach(v => {
    v.types.male.forEach(vMale => {
        vMale.forEach(vMaleTypes => {
          preload(v.id + "-" + vMaleTypes, "data/videos/" + v.id + "-" + vMaleTypes + ".mp4");
        });
    });
    v.types.female.forEach(vFemale => {
        vFemale.forEach(vFemaleTypes => {
          preload(v.id + "-" + vFemaleTypes, "data/videos/" + v.id + "-" + vFemaleTypes + ".mp4");
        });
    });
  });
  // Preload all the videos listed.

});

function preload(fileId, fileAdress){
   preloadQ.loadFile({id:fileId, src:fileAdress, type:createjs.AbstractLoader.VIDEO});
}

function handlePreloaded() {
    console.log("Preloaded");
    // Maybe Not?

    render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));
    // Render React app.
}


/**
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
**/
