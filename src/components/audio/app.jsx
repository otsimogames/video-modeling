import styles from './index.scss';
import React from 'react';

export default class Audio extends React.Component {
	constructor(props) {
		super(props);
		this.audioFormat = otsimo.kv.audioFormat;
	}

	componentDidMount(){
		// Play the audio when component is moundted
		document.getElementById(this.audioId()).play();
	}

	audioId(){
		return this.audioFormat.id.replace("{$1}", this.props.slug);
	}

	audioSlug(){
		return this.audioFormat.slug.replace("{$1}", this.props.slug);
	}

	render() {
		return (
			<audio id={this.audioId()}>
			  <source src={this.audioSlug()} type={this.audioFormat.type}/>
			</audio>
		)
	}
}
