import styles from './index.scss';
import React from 'react';

export default class Hint extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.hint}></div>
		)
	}
}
