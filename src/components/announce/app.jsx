import styles from './index.scss';
import React from 'react';
import TTSManager from '../../js/tts.js';

export default class Announce extends React.Component {
	constructor(props) {
		super(props);
		this.tts = new TTSManager();
		this.tts.speak(this.props.text);
	}

	componentDidMount() {
		let announcerSVGText = document.getElementById("announcerSVGText");
		announcerSVGText.textContent = this.props.text;
		announcerSVGText.style.paintOrder = "stroke";
	}

	/**
	 * Change the current class relative to given status.
	 *
	 * @param {status} status of cover
	 */
	currentClass(status) {
		if (status == "shown") {
			return [styles.announce, styles.announceOpen].join(" ");
		} else if (status == "home") {
			return [styles.announce, styles.announceHome].join(" ");
		} else if (status == "center") {
			return [styles.announce, styles.announceCenter].join(" ");
		} else if (status == "hidden") {
			return styles.announce;
		}
	}

	render() {
		return (
			<div onClick={this.props.onClick} className={this.currentClass(this.props.status)}>
				<svg xmlns="http://www.w3.org/2000/svg">
					<font>
						<font-face font-family="mfont"/>
					</font>
					<text id="announcerSVGText" x="50%" y="60">Default</text>
				</svg>
			</div>
		)
	}
}
