import styles from './index.scss';
import React from 'react';
import Video from '../video/app.jsx';

export default class VideoHolder extends React.Component {
  render() {
    return (
      <div className={styles.videoHolder}>
        <Video id="1"/>
        <Video id="2"/>
        <Video id="3"/>
      </div>
    )
  }
}
