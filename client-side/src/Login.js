import React from 'react'
import { Container } from 'react-bootstrap'
const AUTH_URL=  "https://accounts.spotify.com/authorize?client_id=7d7f967aae8f4654b55e82c60f1c9442&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
export default function Login() {
  return (
    <div
    className="container-fluid d-flex justify-content-center align-items-center"
    style={{ minHeight: "100vh",backgroundColor:"#1f1f1f" }}
  >
    <h3 style={{position:'relative',top:-200,right:-80,fontSize:"50px",fontFamily:"monospace",color:"white"}}>Welcome to Spotify-Mod</h3> 
    <a style={{position:'relative',left:-320}}className="btn btn-success btn-lg" href={AUTH_URL}>
      Login With Spotify
    </a>
  </div>
  )
}
