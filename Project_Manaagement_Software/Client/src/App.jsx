import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
// import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Components/Login';
import CreateLog from './Components/Logs/CreateLog';
import Logs from './Components/Logs/Logs';
import Project from './Components/Projects/Project';
import Register from './Components/Register';


function App() {


  return (
    <>


      {/* <Sidebar /> */}
      {/* <Project /> */}

      {/* <Logs /> */}
      <Router>
        <Routes>
          <Route exact path='/Login' Component={Login}></Route>
          <Route exact path='/Register' Component={Register}></Route>
          <Route exact path='/' Component={Project}></Route>
          {/* <Route exact path='/logs' Component={Logs}></Route> */}
          <Route exact path="/logs/:taskId" Component={Logs}></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App




