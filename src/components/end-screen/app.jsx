import styles from './index.scss';
import React from 'react';
import Audio from '../audio/app.jsx';
import Announce from '../announce/app.jsx';
import Play from '../play/app.jsx';
import Firework from '../firework/app.jsx';

export default class EndScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			announceStatus: "hidden"
		};
		this.announceText = otsimo.kv.endScreenText.text;
		this.audioSlug = otsimo.kv.audios.end;
	}

	/**
	 * Animate announcer when the component is mounted
	 *
	 */
	componentDidMount() {
		setTimeout(() => {
			this.setState({announceStatus: "home"});
		}, 100);
	}

	render() {
		return (
			<div className={styles.endScreen}>
				<Firework/>
				<Announce text={this.announceText} status={this.state.announceStatus}/>
				<Audio slug={this.audioSlug}/>
				<Play onClick={this.props.onPlayGame}/>
			</div>
		)
	}
}
