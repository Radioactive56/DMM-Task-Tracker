
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Form from './components/Form'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Projects from './components/Projects';
import ProjectUpdateForm from './components/ProjectUpdateForm'
import NewEmail from './components/NewEmail';
import Client from './components/Client';
import ClientUpdate from './components/ClientUpdate';
import Register from './components/Register';
import User from './components/User';
import Users from './components/Users';

export let API_URL = process.env.REACT_APP_API_URL


function App() {
  // let API_URL = process.env.REACT_APP_API_URL
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login></Login>}></Route>
        <Route exact path='/setup' element={<Register></Register>}></Route>
        <Route exact path='/users' element={<PrivateRoute><User></User></PrivateRoute>}></Route>
        <Route exact path='/user' element={<PrivateRoute><Users></Users></PrivateRoute>}></Route>
        <Route exact path='/project' element={<PrivateRoute><Form></Form></PrivateRoute>}></Route>
        <Route exact path='/projects' element={<PrivateRoute><Projects/></PrivateRoute>}></Route>
        <Route exact path='/projects/update/:id' element={<PrivateRoute><ProjectUpdateForm/></PrivateRoute>}></Route>
        <Route exact path='/home' element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}></Route>
        <Route exact path='/email' element={<PrivateRoute><NewEmail></NewEmail></PrivateRoute>}></Route>
        <Route exact path='/addClient' element={<PrivateRoute><Client></Client></PrivateRoute>} ></Route>
        <Route exact path='clientupdate/:id' element={<PrivateRoute><ClientUpdate></ClientUpdate></PrivateRoute>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
