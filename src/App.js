import RouteManager from './route.js';
import './App.css';

import BNMO from "./images/BNMO.PNG"

function App() {
  document.title = "BNMO Application"
  return (
    <div className='App'>
      <img className='img-10' alt="BNMO Image" src={BNMO} />
      <RouteManager />
    </div>
  );
}

export default App;
