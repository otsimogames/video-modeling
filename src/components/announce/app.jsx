import styles from './index.scss';
import React from 'react';

export default class Announce extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div onClick={this.props.onClick} className={styles.announce}>
				<svg xmlns="http://www.w3.org/2000/svg">
				  <text x="50%" y="60">
				    {this.props.text}
				  </text>
				</svg>
			</div>
		)
	}
}
