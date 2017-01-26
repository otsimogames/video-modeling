import styles from './index.scss';
import React from 'react';
import Back from '../back/app.jsx';
import Play from '../play/app.jsx';
import Announce from '../announce/app.jsx';
import {randInt, randIntNot} from '../../js/utils.js';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.gameName = otsimo.kv.game.name;
		this.status = "home";
	}

	render() {
		return (
			<div>
				<Back onClick={otsimo.quitgame}/>
				<Announce text={this.gameName} status={this.status}/>
				<Play onClick={this.props.onPlayGame}/>
			</div>
		)
	}
}
