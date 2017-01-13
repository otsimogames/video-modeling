import styles from './index.scss';
import React from 'react';
import Announce from '../announce/app.jsx';

export default class RightAnswer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {announceStatus: "hidden"};
		this.announceText = "Congratulations!";
	}

 componentDidMount() {
	 setTimeout(() => {
		 this.setState({announceStatus: "center"});
	 }, 100);
 }

	render() {
		return (
			<div class={styles.rightAnswer}>
				<div>Right Answer</div>
				<Announce text={this.announceText} status={this.state.announceStatus} />
			</div>
		)
	}
}
