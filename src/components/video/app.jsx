import styles from './index.scss';
import React from 'react';

export default class Video extends React.Component {
	constructor(props) {
		super(props);
	}
	videoSlug = () => {
		return "data/videos/" + this.props.slug + ".mp4";
	}
	videoId = () => {
		return "video" + this.props.id;
	}
	computeClassName(){
		let classArray = styles.video;
		if(this.props.active == "true"){
			classArray = styles.video + " " + styles.videoActive;
		}
	 	return classArray;
	}

	render() {
		return (
			<div className={this.computeClassName()}>
				<video id={this.videoId()} preload="auto">
					<source src={this.videoSlug()} type="video/mp4"/>
					Your browser does not support the video tag.
				</video>
			</div>
		)
	}
}
