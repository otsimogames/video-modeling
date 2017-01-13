import styles from './index.scss';
import React from 'react';
import Home from './components/home/app.jsx';
import VideoHolder from './components/video-holder/app.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.videoQuantity = 3;
		this.state = {
			play: false,
			times: 1
		};
	}
	// NOTE: Shift this to difficulty later on.

	answeredRight(){
		let newTimes = this.state.times + 1;
		this.setState({times:newTimes});
		console.log("Playing: "+ newTimes +". time");
	}

	playGame(){
		this.setState({play:true});
	}

	stopGame(){
		this.setState({play:false});
	}

	render() {
				if(this.state.play == true){
						return (
							<div key={this.state.times}>
								<VideoHolder
									times={this.state.times}
									videoQuantity={this.videoQuantity}
									onGameStop={this.stopGame.bind(this)}
									onRightAnswer={this.answeredRight.bind(this)}/>
							</div>
						);
				}else{
						return(
							<Home onPlayGame={this.playGame.bind(this)}/>
						);
				}
	}
}
