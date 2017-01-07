import styles from './index.scss';
import React from 'react';
import Video from '../video/app.jsx';
import Back from '../back/app.jsx';
import Announce from '../announce/app.jsx';
import {randInt, randIntNot} from '../../js/utils.js';


export default class VideoHolder extends React.Component {
	constructor(props) {
		super(props);
		this.videos = [];
		this.state = {activeVideo: -1, announceStatus: "hidden"};
		this.trueAnswer = randInt(0, (this.props.videoQuantity - 1));
		console.log("trueAnswer: " + this.trueAnswer);
		this.videoGrid = [];
		this.trueText = "Show";
		this.chooseVideos();
	}

	/**
	 * Runs right after component is mounted.
	 * Fills the video array with video DOM elements.
	 * Animates the announce Text fadein
	 *
	 */
	componentDidMount() {
		for (var i = 0; i < this.props.videoQuantity; i++) {
			this.videos.push(document.getElementById('video' + parseInt(i + 1)));
		}

		// Show & animate the announce text after component is mounted
		setTimeout(() => {
			this.setState({announceStatus: "shown"});
		},100);

	}

	/**
	 * Runs right before component is unmounted.
	 * Animates the announce Text fadeout
	 *
	 */
	componentWillUnmount() {
		// Hide & animate the announce text before component is unmounted
		setTimeout(() => {
			this.setState({announceStatus: "shown"});
		},100);
	}

	/**
	 * Randomly chooses a video and fills the rest of the array
	 * with random (but NOT choosen previously) videos.
	 *
	 */
	chooseVideos(){
		let vods = otsimo.kv.videos;
		let randNumber = randInt(0, vods.length - 1);
		this.videoGrid[this.trueAnswer] = this.getRandVideoSlugById(randNumber);
		// Push the true answer in.

		this.announceUpdate(vods[randNumber].text);
		// Update announcer text.

		let i = 0;
		while(i < this.props.videoQuantity){
			if(i != this.trueAnswer){
				this.videoGrid[i] = this.getRandVideoSlugById(randIntNot(0, vods.length - 1, randNumber));
			}
			i++;
		}
	}

	/**
	 * Update the announcer text by given text.
	 *
	 * @param {text} string
	 */
	announceUpdate(text){
		this.trueText = otsimo.kv.announce.text.replace("{$1}", text);
	}

	/**
	 * Randomly choose video from a video set.
	 *
	 * @param {id} id of videoset
	 */
	getRandVideoSlugById(id){
		let vods = otsimo.kv.videos;
		let answerId = id;
		let maleOrFemale = randInt(0,1) ? "female": "male";
		let genderArray = vods[id].types[maleOrFemale];
		let typeArray = genderArray[randInt(0, genderArray.length - 1)];
		return parseInt(answerId + 1) + "-" + typeArray[randInt(0, typeArray.length-1)];
	}

	/**
	 * Animate videos on and on using playVideo function
	 *
	 */
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

	/**
	 * Plays and animates the video with given id.
	 *
	 * @param {id} id Video DOM id
	 */
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

	/**
	 * Generate the class name of videoHolder Component
	 * according to videoQuantity.
	 *
	 */
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

	/**
	 * Get back to main menu of the game.
	 *
	 */
	backMainMenu(){
		console.log("You are in main menu");
	}

	/**
	 * Generate the class name of videoHolder Component
	 * according to videoQuantity.
	 *
	 */
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


	/**
	 * Prepare the video DOM array respect to active Vid.
	 *
	 * @param {acriveVid} active videos id
	 */
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

	render() {
		return (
			<div className={this.holderClassName()}>
				{this.prepVideos(this.state.activeVideo)}
				<button className={styles.button} onClick={this.animatePlayVideos.bind(this)}>
					Animate ({this.state.activeVideo})
					{this.state.announceStatus}
				</button>

				<Back onClick={this.backMainMenu} />
				<Announce text={this.trueText} status={this.state.announceStatus} />
			</div>
		)
	}
}
