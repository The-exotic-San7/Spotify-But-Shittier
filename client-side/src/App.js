import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Home from './Home';
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"

const code =new URLSearchParams(window.location.search).get("code")
function App() {
 return code?  <Home code={code}/>:<Login />
}

export default App;
