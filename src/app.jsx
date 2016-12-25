import styles from './index.scss';
import React from 'react';
import VideoHolder from './components/video-holder/app.jsx';

export default class App extends React.Component {
	constructor() {
		super();
		this.videoQuantity = 3;
	}
	// NOTE: Shift this to difficulty later on.

	render() {
		return (<VideoHolder videoQuantity={this.videoQuantity}/>)
	}
}
