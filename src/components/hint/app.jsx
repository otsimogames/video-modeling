import styles from './index.scss';
import React from 'react';

export default class Hint extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			"status": "hidden"
		};
		this.hintTime = otsimo.kv.game.hint_time * 1000;
		// Hint time comes in seconds
	}

	/**
	 * Start the animation timing after component is mounted.
	 *
	 */
	componentDidMount() {
		this.stateChanger = setInterval(() => {
			this.setState({"status": "show"});
			this.stateChangerFadeout = setTimeout(() => {
				this.setState({"status": "hidden"});
			}, 2000);
		}, this.hintTime);
	}

	/**
	 * clearTimeouts for state changing
	 *
	 */
	componentWillUnmount() {
		clearTimeout(this.stateChanger);
		clearTimeout(this.stateChangerFadeout);
	}

	/**
	 * Generate adjacenting class name of the component respect
	 * to current status state.
	 *
	 */
	getClassName() {
		if (this.state.status == "show") {
			return [styles.hint, styles.hintShown].join(" ");
		} else if (this.state.status == "hidden") {
			return styles.hint;
		}
	}

	render() {
		return (
			<div key={this.state.status} className={this.getClassName()}></div>
		)
	}
}
