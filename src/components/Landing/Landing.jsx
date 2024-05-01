import React from 'react'
import "./index.css"
import VideoPlayer from './VideoPlayer'

function Landing(props) {
  return (
    <div className='landing '>
        <VideoPlayer />
        <div className='connect-btn'>
        {props.connectBtn}
        </div>
    </div>
  )
}

export default Landing