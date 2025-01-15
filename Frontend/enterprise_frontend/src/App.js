
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Form from './components/Form'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Projects from './components/Projects';
import ProjectUpdateForm from './components/ProjectUpdateForm'
import NewEmail from './components/NewEmail';

export let API_URL = process.env.REACT_APP_API_URL


function App() {
  let API_URL = process.env.REACT_APP_API_URL
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login></Login>}></Route>
        <Route exact path='/project' element={<PrivateRoute><Form></Form></PrivateRoute>}></Route>
        <Route exact path='/projects' element={<PrivateRoute><Projects/></PrivateRoute>}></Route>
        <Route exact path='/projects/update/:id' element={<PrivateRoute><ProjectUpdateForm/></PrivateRoute>}></Route>
        <Route exact path='/home' element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}></Route>
        <Route exact path='/email' element={<PrivateRoute><NewEmail></NewEmail></PrivateRoute>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
