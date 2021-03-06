import styles from './index.scss';
import React from 'react';
import Hint from '../hint/app.jsx';

export default class Video extends React.Component {

	constructor(props) {
		super(props);
		this.videoFormat = otsimo.kv.videoFormat;
	}

	componentDidMount() {
		let video = document.getElementById(this.videoId());
		// Load the video adter the component mounts.
		video.load();
	}

	/**
	 * Return video id string
	 *
	 */
	videoId = () => {
		return this.videoFormat.id.replace("{$1}", this.props.id);
	}

	/**
	 * Generate the video slug of the word.
	 *
	 */
	videoSlug = () => {
		return this.videoFormat.slug.replace("{$1}", this.props.slug);
	}

	/**
	 * Generate class name respect video beeing active.
	 *
	 */
	computeClassName() {
		let classArray = styles.video;
		if (this.props.active == "true") {
			classArray = [styles.videoActive, classArray].join(" ");
		}
		return classArray;
	}

	render() {
		return (
			<div onClick={this.props.onClick} className={this.computeClassName()}>
				<video id={this.videoId()} preload="metadata" muted="true" playsInline="true">
					<source src={this.videoSlug()} type={this.videoFormat.type}/>
					Your browser does not support the video tag.
				</video>
				{this.props.isTrue && <Hint/>}
			</div>
		)
	}
}
