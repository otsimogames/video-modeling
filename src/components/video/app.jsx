import styles from './index.scss';
import React from 'react';

export default class Video extends React.Component {
  constructor(props){
    super(props);
  }
  videoSlug = () => {
    return "data/videos/"+this.props.slug +".mp4";
  }
  videoId = () => {
    return "video" + this.props.id;
  }
  videoStyle = () => {
    switch (this.props.id) {
      case "1":
        return styles.video + " " + styles.video1;
    case "2":
        return styles.video + " " + styles.video2;
    case "3":
        return styles.video + " " + styles.video3;

    }
  }
  render() {
    return (
      <div className={this.videoStyle()}>
        <video id={this.videoId()} preload="auto">
        <source src={this.videoSlug()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }
}
