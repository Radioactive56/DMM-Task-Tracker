import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Form from './components/Form'

export let API_URL = process.env.REACT_APP_API_URL


function App() {
  let API_URL = process.env.REACT_APP_API_URL
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Form></Form>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
