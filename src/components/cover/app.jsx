import styles from './index.scss';
import React from 'react';

export default class Cover extends React.Component {
	constructor(props) {
		super(props);
	}

		/**
		 * Change the current class relative to given status.
		 *
		 * @param {status} status of cover
		 */
	currentClass(status){
		if(status == "shown"){
			return styles.cover + " " + styles.coverOpen;
		}else if(status == "hidden"){
			return styles.cover;
		}
	}
	render() {
		return (
			<div className={this.currentClass(this.props.status)}>
			</div>
		)
	}
}
