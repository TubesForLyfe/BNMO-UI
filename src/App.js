import RouteManager from './route.js';
import './App.css';

import BNMO from "./images/BNMO.PNG"

function App() {
  document.title = "BNMO Application"
  return (
    <div className='App'>
      <img className='img' src={BNMO} />
      <RouteManager />
    </div>
  );
}

export default App;
