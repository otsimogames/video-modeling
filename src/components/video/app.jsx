import styles from './index.scss';
import React from 'react';

export default class Video extends React.Component {
  constructor(props){
    super(props);
  }
  videoSlug = () => {
    return "data/videos/"+this.props.id +"-1-1.mp4";
  }
  render() {
    return (
      <div className={styles.video}>
        <video preload="auto" controls>
        <source src={this.videoSlug()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
}
