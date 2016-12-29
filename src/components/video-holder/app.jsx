import styles from './index.scss';
import React from 'react';
import Video from '../video/app.jsx';

export default class VideoHolder extends React.Component {
	constructor(props) {
		super(props);
		this.videos = [];
		this.state = {activeVideo: -1};
	}

	componentDidMount() {
		for (var i = 0; i < this.props.videoQuantity; i++) {
			this.videos.push(document.getElementById('video' + parseInt(i + 1)));
		}
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

	prepVideos(activeVid) {
		var videos = [];
		for (var i = 0; i < this.props.videoQuantity; i++) {
			videos.push(
				<Video
				id={i + 1}
				key={i + 1}
				slug={"1-2-" + parseInt(i + 1)}
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
