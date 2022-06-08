import React from 'react'
import { AiFillPlayCircle } from "react-icons/ai";

export default function Recents({track,chooseRecent}) {
    function handlePlay(){
        chooseRecent(track)
     }
  return (
    <div className="card" style={{ cursor: "pointer",width: "12rem" ,margin:'30px',marginLeft:'90px' ,border:'1px solid ' ,boxShadow:"1px 2px 8px 1px black" }} onClick={handlePlay}>
    <img className='card-img-top' src={track.albumUrl}   />
    <div className="card-body" style={{ cursor: "pointer",backgroundColor:"black" ,border:'1px solid black',borderRightColor:'black',borderBottomColor:'black' }}>
      <h5 className="card-title" style={{ cursor: "pointer",fontSize: "15px",color: "white" ,marginBottom:'-20px'  }}>{track.title}</h5><AiFillPlayCircle color="#e6a422" style={{ cursor: "pointer",position:'relative',right:'-130px',bottom:"-20px"}} size={35}/>
      <p className="card-text" style={{cursor: "pointer",fontSize: "12px",color:'grey'}} >{track.artist}</p>
    </div>
  </div>
  )
}
