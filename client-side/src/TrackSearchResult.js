import React from 'react'

export default function TrackSearchResult({track,chooseTrack}){
  function handlePlay(){
       chooseTrack(track)
    }
  return (
    <div
    className="d-flex m-2 align-items-center"
    style={{ cursor: "pointer" }}
    onClick={handlePlay}
  >
    <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
    <div className="m-2 py-3">
      <div style={{color: "white"}}>{track.title}</div>
      <div  style={{ color: "grey" }}>{track.artist}</div>
    </div>
  </div>
  )
}
