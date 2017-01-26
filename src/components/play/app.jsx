import styles from './index.scss';
import React from 'react';

export default class Play extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div onClick={this.props.onClick} className={styles.play}></div>
		)
	}
}
