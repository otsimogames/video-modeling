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

	componentDidMount() {
		setTimeout(() => {
			this.setState({"status": "show"});
		}, this.hintTime);
	}

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
