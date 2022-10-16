import logo from './logo.svg';
import './App.css';
import Classifier from './components/Classifier/Classifier';


function App() {
  return (
    <div className="App">
      <Classifier/>
      <img src="https://raw.githubusercontent.com/DuongDiesel/imageUpload/main/00000001_001.png" width={250} height={250} alt='00000001_001' />
    </div>
  );
}

export default App;
