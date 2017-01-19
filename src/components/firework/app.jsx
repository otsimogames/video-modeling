import styles from './index.scss';
import React from 'react';
import {startDrawing} from '../../js/firework.js';

export default class Firework extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		startDrawing();
	}

	render() {
		return (
			<canvas id="canvas" className={styles.firework}></canvas>
		)
	}
}
