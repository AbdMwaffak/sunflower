import React from 'react';
import ReactPlayer from 'react-player';
import './videoPlayer.css'
const VideoPlayer = ({ videoUrl }) => {
    return (
        <div className='videoPlayer'>
            <ReactPlayer url={videoUrl}
                controls playing />
        </div>
    );
}

export default VideoPlayer;
