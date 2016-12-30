import styles from './index.scss';
import React from 'react';
import Home from './components/home/app.jsx';
import VideoHolder from './components/video-holder/app.jsx';

export default class App extends React.Component {
	constructor() {
		super();
		this.videoQuantity = 3;
	}
	// NOTE: Shift this to difficulty later on.

	backMainMenu(){
		console.log("Back to main menu.");
	}

	render() {
		return (
			<div>
				<Home show="false" />
				<VideoHolder videoQuantity={this.videoQuantity}/>
			</div>
			)
	}
}
