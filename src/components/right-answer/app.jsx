import styles from './index.scss';
import React from 'react';
import Audio from '../audio/app.jsx';
import Announce from '../announce/app.jsx';

export default class RightAnswer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			announceStatus: "hidden"
		};
		this.announceText = otsimo.kv.rightAnswerText.text;
		this.audioSlug = otsimo.kv.audios.rightAnswer;
	}

	/**
	 * Animate announcer when the component is mounted
	 *
	 */
	componentDidMount() {
		setTimeout(() => {
			this.setState({announceStatus: "center"});
		}, 100);
		setTimeout(() => {
			this.setState({announceStatus: "hidden"});
		}, 2700);
	}

	render() {
		return (
			<div className={styles.rightAnswer}>
				<div></div>
				<Announce text={this.announceText} status={this.state.announceStatus}/>
				<Audio slug={this.audioSlug}/>
			</div>
		)
	}
}
