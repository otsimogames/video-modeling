import styles from './index.scss';
import React from 'react';

export default class Announce extends React.Component {
	constructor(props) {
		super(props);
	}

	currentClass(status){
		if(status == "shown"){
			return styles.announce + " " + styles.announceOpen;
		}else if(status == "home"){
				return styles.announce + " " + styles.announceHome;
		}else if(status == "hidden"){
			return styles.announce;
		}
	}
	render() {
		return (
			<div onClick={this.props.onClick} className={this.currentClass(this.props.status)}>
				<svg xmlns="http://www.w3.org/2000/svg">
				  <text x="50%" y="60">
				    {this.props.text}
				  </text>
				</svg>
			</div>
		)
	}
}
