import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './app.jsx';
import TTSManager from './js/tts.js';

otsimo.run(() => {
	let app = document.querySelector("#app");
	// Carrier DOM object.

	let otsKV = otsimo.kv;
	let tts = new TTSManager();
	tts.setVoiceDriver(otsKV.tts_voices[0]);

	// Locatization file object.

	app.innerHTML = "<div id='loading'>" + otsKV.loadingText.text + "</div>";
	let loadingObj = document.getElementById("loading");
	loading.style.textAlign = otsKV.loadingText.align;
	loading.style.lineHeight = otsimo.height + "px";
	loading.style.color = otsKV.loadingText.color;
	loading.style.fontSize = otsKV.loadingText.size

	var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	app.style.background = otsKV.layout.background;
	app.style.height = `${h}px`;
	app.style.width = `${w}px`;
	app.style.backgroundImage = "url('" + otsKV.layout.backgroundImage + "')";
	app.style.backgroundSize = "auto 100%";
	// Initilize app width and height

	renderApp();

});

function renderApp() {
	render(
		<AppContainer><App/></AppContainer>, document.querySelector("#app"));
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
