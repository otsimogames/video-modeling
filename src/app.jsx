import styles from './index.scss';
import React from 'react';
import Home from './components/home/app.jsx';
import VideoHolder from './components/video-holder/app.jsx';
import EndScreen from './components/end-screen/app.jsx';
import Session from './js/session.js';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.videoQuantity = 3;
		this.state = {
			play: false,
			endScreen: false,
			times: 1
		};
		this.prevAsked = "none";
	}
	// NOTE: Shift this to difficulty later on.

	answeredRight(prevQuestion) {
		if (this.state.times == otsimo.kv.game.session_step) {
			this.endSession();
		} else {
			let newTimes = this.state.times + 1;
			this.setState({times: newTimes});
			this.prevAsked = prevQuestion;
		}
	}

	endSession() {
		this.setState({endScreen: true});
		this.session.sessionEnd();
	}

	playGame() {
		// Start a new session
		this.session = new Session();
		this.session.sessionStart();
		// Send session start data to analytic

		this.setState({play: true, endScreen: false});
	}

	stopGame() {
		this.setState({play: false});
	}

	render() {
		if (this.state.play == true) {
			if (this.state.endScreen == true) {
				return (<EndScreen onPlayGame={this.playGame.bind(this)}/>);
			} else {
				return (
					<div key={this.state.times}>
						<VideoHolder times={this.state.times} videoQuantity={this.videoQuantity} onGameStop={this.stopGame.bind(this)} onRightAnswer={this.answeredRight.bind(this)} session={this.session} prevAsked={this.prevAsked}/>
					</div>
				);
			}
		} else {
			return (<Home onPlayGame={this.playGame.bind(this)}/>);
		}
	}
}
