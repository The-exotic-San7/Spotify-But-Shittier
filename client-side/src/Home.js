import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import { Container,Form } from 'react-bootstrap'
import useAuth from './useAuth'
import Player from './Player'
import './index.css'
import Recents from './Recents'
import Loading from './Loading'
const spotifyApi =new SpotifyWebApi({
    clientId: "8b945ef10ea24755b83ac50cede405a0",
})
export default function Hello({code}) {
    const accessToken=useAuth(code)
  const [search,setSearch]=useState("");
  const [searchResult,setSearchResult]=useState([]);
  const [playing,setPlaying] =useState()
  const [recents,setRecents] = useState([])
  const [loading,setLoading] = useState(true);

  function chooseTrack(track){
    setPlaying(track)
   
    

  }

  


  function chooseRecent(track){
    setPlaying(track)
  }
  
  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if(!search) return setSearchResult([])
    if (!accessToken) return

    let cancel = false
    
    spotifyApi.searchTracks(search).then(res => {
      console.log(res)
      if (cancel) return
      setSearchResult(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    

    return () => (cancel = true)
  }, [search, accessToken])

  useEffect(()=>{
    
   if(search) return setRecents([])
    if (!accessToken) return

    setTimeout(()=>{
    
    spotifyApi.getMySavedTracks({limit:50}).then(data => {
      console.log(data)
      setRecents(
        data.body.items.map(item => {
          const smallestAlbumImage = item.track.album.images.reduce(
            (smallest, image) => {
              if (image.height > smallest.height) return image
              return smallest
            },
            item.track.album.images[0]
          )

          setLoading(false)
          
            
         

          return {
            artist: item.track.artists[0].name,
            title: item.track.name,
            uri: item.track.uri,
            albumUrl: smallestAlbumImage.url
            
          }
        })
      )
    })

  },1000)
  },[search,accessToken])

  return (
    <div  className="container-fluid d-flex flex-column py-2" style={{ height: "100vh",backgroundColor:"#333332" ,overflowY:"hidden"}}>
      
      <input className="form-control "
        style={{backgroundColor:"#242424" ,color:"white"}}
        type="search"
        placeholder="Search Songs/Artists"
        
        value={search}
        onChange={e => setSearch(e.target.value)} 
      />
      {loading && <Loading />}

      <div className='container-items  ' style={{ overflowY: "scroll" ,overflowX:'hidden' }}>
        <h5 style={{fontFamily:"Monaco,monospace",color:"white",position:"relative",right:'-85px',bottom:'-20px',fontSize:'28px',fontWeight:'bolder'}}>Weekend Vibes</h5>
        <p style={{fontFamily:"monospace",position:"relative",right:"-80px",bottom:'-18px',color:"#919190",fontWeight:'bold'}}>Inspired by recent activities</p>
        <div className="row m-6 " >
        {recents.map(track=>(
          <div className="col-lg-3 col-md-6 col-sm-6  " style={{ borderColor:'black',position:'relative',bottom:'-20px'}}>
          <Recents 
            track={track}
            key={track.uri}
            chooseRecent={chooseRecent}
          />
          </div>
        ))}
        </div>
      </div>
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResult.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        
        
      </div>

      <div>
        <Player  accessToken={accessToken} trackUri ={playing?.uri} />
      </div>


      </div>
  )
        }