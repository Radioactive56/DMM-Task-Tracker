
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Form from './components/Form'
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export let API_URL = process.env.REACT_APP_API_URL


function App() {
  let API_URL = process.env.REACT_APP_API_URL
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login></Login>}></Route>
        <Route exact path='/project' element={<Form></Form>}></Route>
        <Route exact path='/home' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
