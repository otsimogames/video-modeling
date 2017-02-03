import styles from './index.scss';
import React from 'react';
import Video from '../video/app.jsx';
import Back from '../back/app.jsx';
import Announce from '../announce/app.jsx';
import Cover from '../cover/app.jsx';
import RightAnswer from '../right-answer/app.jsx';
import {randInt, randIntNot} from '../../js/utils.js';
import createjs from 'preload-js';

export default class VideoHolder extends React.Component {
	constructor(props) {
		super(props);
		this.videos = [];
		this.state = {
			activeVideo: -1,
			announceStatus: "hidden",
			videoCarrierStatus: "hidden",
			coverStatus: "shown",
			rightAnswer: false
		};
		this.session = this.props.session;
		this.preloadQ = new createjs.LoadQueue();
		this.videoFormat = otsimo.kv.videoFormat;
		this.trueAnswer = randInt(0, (this.props.videoQuantity - 1));
		console.log("trueAnswer: " + this.trueAnswer);
		this.currentWord = "";
		this.videoGrid = [];
		this.wrongAttempt = 0;
		this.chosenVideos = [];
		this.chooseVideos();
		this.preloadVideos();

		this.preloadQ.on("complete", () => {
			console.log("preloaded");
		}, this);
		// Create preload queue
	}

	/**
	 * Runs right after component is mounted.
	 * Fills the video array with video DOM elements.
	 * Animates the announce Text fadein
	 *
	 */
	componentDidMount() {
		for (var i = 0; i < this.props.videoQuantity; i++) {
			let videoId = otsimo.kv.videoFormat.id.replace("{$1}", parseInt(i + 1));
			this.videos.push(document.getElementById(videoId));
		}

		// Show & animate the announce text & videoCarrier after component is mounted
		setTimeout(() => {
			this.setState({announceStatus: "shown", videoCarrierStatus: "shown"});

			// Start playing videos after 2 secs.
			setTimeout(() => {
				this.animatePlayVideos();
			}, 2000);
		}, 100);

		// send data to analytic that step started
		this.session.startStep();

	}

	/**
	 * Runs right before component is unmounted.
	 * Animates the announce Text fadeout
	 *
	 */
	componentWillUnmount() {
		// Hide & animate the announce text & videoCarrier before component is unmounted
		this.setState({announceStatus: "hidden", videoCarrierStatus: "hidden"});
	}

	/**
	 * Randomly chooses a video and fills the rest of the array
	 * with random (but NOT choosen previously) videos.
	 *
	 */
	chooseVideos() {
		let vods = otsimo.kv.videos;
		let randNumber = randInt(0, vods.length - 1);
		this.trueAnswerChosen = this.getRandVideoSlugById(randNumber);
		this.videoGrid[this.trueAnswer] = this.trueAnswerChosen;
		// Push the true answer in.
		this.currentWord = vods[randNumber].text;
		this.announceUpdate(this.currentWord);
		// Update announcer text.

		let i = 0;
		while (i < this.props.videoQuantity) {
			if (i != this.trueAnswer) {
				let randIntNotVid = randIntNot(0, vods.length - 1, randNumber);
				this.videoGrid[i] = this.getRandVideoSlugById(randIntNotVid);
				this.chosenVideos.push(randIntNotVid);
			}
			i++;
		}

	}

	/**
	 * Preload video files
	 *
	 * @param {fileId} intiger
	 * @param {fileAdress} string
	 */
	preload(fileId, fileAdress) {
		this.preloadQ.loadFile({id: fileId, src: fileAdress, type: createjs.AbstractLoader.VIDEO});
	}
	/**
	 * Send chosen videos to preloader
	 *
	 * @param {fileId} intiger
	 * @param {fileAdress} string
	 */
	preloadVideos() {
		this.videoGrid.forEach((vG) => {
			this.preload(this.videoFormat.slug.replace("{$1}", vG));
		});
	}

	/**
	 * Update the announcer text by given text.
	 *
	 * @param {text} string
	 */
	announceUpdate(text) {
		this.trueText = otsimo.kv.announce.text.replace("{$1}", text);
	}

	/**
	 * Randomly choose video from a video set.
	 *
	 * @param {id} id of videoset
	 */
	getRandVideoSlugById(id) {
		let vods = otsimo.kv.videos;
		let randNumber = randInt(0, vods.length - 1);
		let answerId = id;
		let maleOrFemale = randInt(0, 1)
			? "female"
			: "male";
		let genderArray = vods[id].types[maleOrFemale];
		let typeArray = genderArray[randInt(0, genderArray.length - 1)];

		let returnVal = parseInt(answerId + 1) + "-" + typeArray[randInt(0, typeArray.length - 1)];
		if (this.chosenVideos.includes(id) || this.props.prevAsked == returnVal) {
			return this.getRandVideoSlugById(randIntNot(0, vods.length - 1, randNumber));
		} else {
			return returnVal;
		}
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
		this.playVideo(otsimo.kv.videoFormat.id.replace("{$1}", 0));
	}

	/**
	 * Remove the chain video play animation after
	 * Animation is done.
	 *
	 */
	removeVideoOnended() {
		this.videos.forEach((vid) => {
			vid.onended = () => {
				// do nothing.
			}
		});
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
			this.setState({coverStatus: "hidden"});
			this.removeVideoOnended();
		}
	}

	/**
	 * Generate the class name of videoHolder Component
	 * according to videoQuantity.
	 *
	 */
	holderClassName(status) {
		let additionalClass;
		if (this.props.videoQuantity == 2) {
			additionalClass = styles.videoHolder2;
		} else if (this.props.videoQuantity == 3) {
			additionalClass = styles.videoHolder3;
		} else if (this.props.videoQuantity == 4) {
			additionalClass = styles.videoHolder4;
		}
		if (status == "shown") {
			return [styles.videoHolder, styles.videoHolderShow, additionalClass].join(" ");
		} else if (status == "hidden") {
			return [styles.videoHolder, additionalClass].join(" ");

		}
	}

	/**
	 * Get back to main menu of the game.
	 *
	 */
	backMainMenu() {
		this.props.onGameStop();
	}

	/**
	 * Generate the class name of videoHolder Component
	 * according to videoQuantity.
	 *
	 */
	videoClick(videoid) {
		let videoCheck = parseInt(videoid.target.getAttribute("id").replace("video", "")) - 1;
		if (videoCheck == this.trueAnswer) {
			this.rightAnswer(videoCheck);
		} else {
			this.wrongAnswer(videoCheck);
			this.videos[this.trueAnswer].play();
		}
	}

	/**
	 * Function that called after right answer is given
	 * sends costumevent and shows rightAnswer Component
	 *
	 * @param {videoCheck} order of the video that the right answer is.
	 */
	rightAnswer(videoCheck) {
		console.log("Right Answer!");
		// Send right answer data to analytic.
		this.session.correctInput(this.currentWord, this.wrongAttempt);
		this.setState({rightAnswer: true});
		setTimeout(() => {
			this.props.onRightAnswer(this.trueAnswerChosen);
		}, 3000);
	}

	/**
	 * Function that called after wrong answer is given
	 * Changes the opacity of wrong answer
	 *
	 * @param {videoCheck} order of the video that wrong answer is.
	 */
	wrongAnswer(videoCheck) {
		console.log("Wrong Answer!");
		this.wrongAttempt++;
		this.videos[videoCheck].style.opacity = "0.5";
		this.session.wrongInput(videoCheck, this.wrongAttempt, 0, this.currentWord);
	}

	/**
	 * Prepare the video DOM array respect to active Vid.
	 *
	 * @param {acriveVid} active videos id
	 */
	prepVideos(activeVid) {
		var videos = [];
		for (var i = 0; i < this.props.videoQuantity; i++) {
			videos.push(<Video id={i + 1} key={i + 1} slug={this.videoGrid[i]} onClick={(e) => this.videoClick(e)} active={(i == activeVid)
				? "true"
				: "false"} isTrue={this.trueAnswer == i}/>);
		}
		return videos;
	}

	render() {
		if (!this.state.rightAnswer) {
			return (
				<div className={this.holderClassName(this.state.videoCarrierStatus)}>
					{this.prepVideos(this.state.activeVideo)}
					<Back onClick={this.backMainMenu.bind(this)}/>
					<Announce text={this.trueText} status={this.state.announceStatus}/>
					<Cover status={this.state.coverStatus}/>
				</div>
			);
		} else {
			return (<RightAnswer/>);
		}

	}
}
