import styles from './index.scss';
import React from 'react';
import Home from './components/home/app.jsx';
import VideoHolder from './components/video-holder/app.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.videoQuantity = 3;
		this.state = {
			play: false
		};
	}
	// NOTE: Shift this to difficulty later on.

	playGame(){
		this.setState({play:true});
	}

	stopGame(){
		this.setState({play:false});
	}

	render() {
				if(this.state.play == true){
						return (
							<VideoHolder videoQuantity={this.videoQuantity} onGameStop={this.stopGame.bind(this)}/>
						);
				}else{
						return(
							<Home onPlayGame={this.playGame.bind(this)}/>
						);
				}
	}
}
