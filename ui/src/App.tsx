import React from "react";
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';
import NavBar from './components/common/navBar';
function App() {
  return (
    <div className="App text-center" d-flex justify-content-center style={{alignSelf : 'center'}}>
      <NavBar/>
      <Router history={history}>
<Routes/>
      </Router>
    </div>
  );
}

export default App;
