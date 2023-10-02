import React, { useEffect } from 'react'
// import JSMpeg from 'jsmpeg-player'

const VideoPlayer = ({camera_url}) => {
  useEffect(() => {
    const canvas = document.getElementById('video-canvas')
    // const url = `ws://${document.location.hostname}:8082/`
    const url = camera_url
    const player = new JSMpeg.Player(url, { canvas: canvas })
    console.log(url);

    return () => {
      player.destroy() // Clean up the player when the component unmounts
    }
  }, [])

  return (
    <div>
      <canvas 
        id="video-canvas"
        style={{ width: '500px', height: '480px', border: '2px solid #000' }}
    ></canvas>
    </div>
  )
}

export default VideoPlayer
