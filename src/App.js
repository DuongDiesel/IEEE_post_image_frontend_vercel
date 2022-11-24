import logo from './logo.svg';
import './App.css';
import Classifier from './components/Classifier/Classifier';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <h1>Web diagnostic system</h1>
      <Classifier/>
    </div>
  );
}

export default App;
