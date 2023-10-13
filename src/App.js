import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Components/Header.js';
import HomePage from './Components/HomePage.js';
import CoinPage from './Components/CoinPage.js';

function App() {

  return (
    <BrowserRouter>
      <div className='app'>
        <Header/>
        <Routes>
          <Route exact path='/' Component={HomePage} index />
          <Route path='/coin/:id' Component={CoinPage}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
