import styles from './index.scss';
import React from 'react';
import Back from '../back/app.jsx';
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
				<Announce text={this.gameName} status={this.status}/>
				<div onClick={this.props.onPlayGame} className={styles.play}></div>
			</div>
		)
	}
}
