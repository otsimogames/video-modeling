import styles from './index.scss';
import React from 'react';

export default class Cover extends React.Component {
	constructor(props) {
		super(props);
	}

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
