
import './App.css'
import { Body } from './views/Body/Body'
import { NavBar } from './views/NavBar/NavBar'

function App() {


  return (
    <>
      <div className="layout">
        <div className="navbar">
          <NavBar />
        </div>
        <div className="content">
          <Body />
        </div>
      </div>
    </>
  )
}

export default App
