import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({accessToken,trackUri}) {
    const [play,setPlay] =useState(false)

    useEffect(()=>setPlay(true),[trackUri])
    if(!accessToken) return null

  return (
    <SpotifyPlayer
    token={accessToken}
    showSaveIcon
    callback={state=>{
        if(!state.isPlaying)return setPlay(false);
    }}
    styles={{
        activeColor: 'green',
        bgColor: '#242424',
        color: 'white',
        loaderColor: '#fff',
        sliderColor: '#2abf52',
        sliderHandleColor:'white',
        sliderTrackColor:'grey',
        
        
        trackArtistColor: '#e0dede',
        trackNameColor: 'white',
        height:'60px'
      }}
      
    play={play}
    uris={trackUri ?[trackUri]:[]} />
  )
}
