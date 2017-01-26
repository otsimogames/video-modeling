import styles from './index.scss';
import React from 'react';

export default class Hint extends React.Component {

	constructor(props) {
		super(props);
		this.status = this.props.status;
	}

	getClassName() {
		if (this.status == "show") {
			return [styles.hint, styles.hintShown].join(" ");
		} else if (this.status == "hidden") {
			return styles.hint;
		}
	}

	render() {
		return (
			<div className={this.getClassName()}></div>
		)
	}
}
