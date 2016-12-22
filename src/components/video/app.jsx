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
        <video src={this.videoSlug()} type="video/mp4" controls>
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
}
