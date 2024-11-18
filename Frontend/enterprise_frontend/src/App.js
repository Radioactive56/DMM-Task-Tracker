import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Form from './components/Form'

function App() {
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
