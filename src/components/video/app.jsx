import styles from './index.scss';
import React from 'react';

export default class Video extends React.Component {


	constructor(props) {
		super(props);
	}

	/**
	 * Generate the video slug of the word.
	 *
	 */
	videoSlug() {
		return "data/videos/" + this.props.slug + ".mp4";
	}

	/**
	 * Return video id string
	 *
	 */
	videoId(){
		return "video" + this.props.id;
	}

	/**
	 * Generate class name respect video beeing active.
	 *
	 */
	computeClassName(){
		let classArray = styles.video;
		if(this.props.active == "true"){
			classArray =   + " " + styles.videoActive;
		}
	 	return classArray;
	}

	render() {
		return (
			<div onClick={this.props.onClick} className={this.computeClassName()}>
				<video id={this.videoId()} preload="auto">
					<source src={this.videoSlug()} type="video/mp4"/>
					Your browser does not support the video tag.
				</video>
			</div>
		)
	}
}
