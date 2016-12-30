import styles from './index.scss';
import React from 'react';
import Video from '../video/app.jsx';
import {randInt, randIntNot} from '../../js/utils.js';

export default class VideoHolder extends React.Component {
	constructor(props) {
		super(props);
		this.videos = [];
		this.state = {activeVideo: -1};
		this.trueAnswer = randInt(0, (this.props.videoQuantity - 1));
		console.log("trueAnswer: " + this.trueAnswer);
		this.videoGrid = [];
		this.chooseVideos();
	}

	componentDidMount() {
		for (var i = 0; i < this.props.videoQuantity; i++) {
			this.videos.push(document.getElementById('video' + parseInt(i + 1)));
		}
	}

	chooseVideos(){
		let vods = otsimo.kv.videos;
		let randNumber = randInt(0, vods.length - 1);
		this.videoGrid[this.trueAnswer] = this.getRandVideoSlugById(randNumber);
		// Pushed the true answer in.
		console.log("Which is: " + vods[randNumber].text);

		let i = 0;
		while(i < this.props.videoQuantity){
			if(i != this.trueAnswer){
				this.videoGrid[i] = this.getRandVideoSlugById(randIntNot(0, vods.length - 1, randNumber));
			}
			i++;
		}
	}

	getRandVideoSlugById(id){
		let vods = otsimo.kv.videos;
		let answerId = id;
		let maleOrFemale = randInt(0,1) ? "female": "male";
		let genderArray = vods[id].types[maleOrFemale];
		let typeArray = genderArray[randInt(0, genderArray.length - 1)];
		return parseInt(answerId + 1) + "-" + typeArray[randInt(0, typeArray.length-1)];
	}

	animatePlayVideos() {
		let i = 0;
		this.videos.forEach((vid) => {
			vid.onended = () => {
				this.playVideo(vid.id);
			}
			i++;
		});

		// Start Animation
		this.playVideo("video0");
	}

	playVideo(vidId) {
		let myVidInt = parseInt(vidId.replace('video', ''));
		let video2Play = this.videos[myVidInt];
		if (video2Play) {
			this.setState({activeVideo: myVidInt});
			video2Play.play();
		} else {
			this.setState({activeVideo: -1});
		}
	}

	videoClick(videoid){
			let videoCheck = parseInt(videoid.target.getAttribute("id").replace("video", "")) - 1;
			if(videoCheck == this.trueAnswer){
				this.rightAnswer(videoCheck);
			}else{
				this.wrongAnswer(videoCheck);
			}
	}

	rightAnswer(videoCheck){
			console.log("Right Answer!");
	}

	wrongAnswer(videoCheck){
			console.log("Wrong Answer!");
	}

	prepVideos(activeVid) {
		var videos = [];
		for (var i = 0; i < this.props.videoQuantity; i++) {
			videos.push(
				<Video
				id={i + 1}
				key={i + 1}
				slug={this.videoGrid[i]}
				onClick={(e) => this.videoClick(e)}
				active={(i == activeVid) ? "true": "false"}/>
			);
		}
		return videos;
	}

	holderClassName() {
		let additionalClass;
		if (this.props.videoQuantity == 2) {
			additionalClass = styles.videoHolder2;
		} else if (this.props.videoQuantity == 3) {
			additionalClass = styles.videoHolder3;
		} else if (this.props.videoQuantity == 4) {
			additionalClass = styles.videoHolder4;
		}
		return styles.videoHolder + " " + additionalClass;
	}

	render() {
		return (
			<div className={this.holderClassName()}>
				{this.prepVideos(this.state.activeVideo)}
				<button className={styles.button} onClick={this.animatePlayVideos.bind(this)}>
					Animate ({this.state.activeVideo})
				</button>
			</div>
		)
	}
}
