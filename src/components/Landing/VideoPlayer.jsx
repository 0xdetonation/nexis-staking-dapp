import React, { useEffect, useRef } from 'react';

function VideoPlayer() {
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(()=>{
    handlePlay()
  },[])

  return (
    <div className='video-wrapper'>
      <video ref={videoRef} loop style={
        {width:'80vw'}
      } className='video-player'>
        <source src="https://framerusercontent.com/assets/fs3RC3Htt9lACmFL9MNeYDQGGT4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
