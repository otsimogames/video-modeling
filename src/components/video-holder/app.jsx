import styles from './index.scss';
import React from 'react';
import Video from '../video/app.jsx';

export default class VideoHolder extends React.Component {
  animatePlayVideos(){
    var video1 = document.getElementById("video1");
    var video2 = document.getElementById("video2");
    var video3 = document.getElementById("video3");

    
    video1.play();
    video1.onended = () => {
      video2.play();
      video2.onended = () => {
        video3.play();
        video3.onended = () => {
          alert("all ended");
        }
      }
    }
  }

  render() {
    return (
      <div className={styles.videoHolder}>
        <Video id="1" slug="1-2-1"/>
        <Video id="2" slug="1-2-2"/>
        <Video id="3" slug="1-2-3"/>
        <button onClick={this.animatePlayVideos} >Animate</button>
      </div>
    )
  }
}
