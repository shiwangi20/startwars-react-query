import {useState} from 'react';
import NavBar from "./components/NavBar";
import Planets from './components/Planets';
import People from './components/People';

const App = () => {
  const [page,setPage] = useState('Planets');

  return (
    <div className="App">
      <h1>Start Wars Info</h1>
      <NavBar setPage={setPage}/>
      <div className="content">
        { page === 'Planets' ? <Planets/> : <People/>}
      </div>
    </div>
  );
}

export default App;
