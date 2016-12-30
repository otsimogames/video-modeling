import styles from './index.scss';
import React from 'react';
import Back from '../back/app.jsx';
import Announce from '../announce/app.jsx';
import {randInt, randIntNot} from '../../js/utils.js';


export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	updateClass(){
		if(this.props.show == "true"){
			return styles.home;
		}else{
			return styles.home + " " + styles.hide;
		}
	}


	render() {
		return (
			<div className={this.updateClass}>
				Home !!
			</div>
		)
	}
}
