import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import Footer from './Components/Footer';
import DeleteDomaine from './Components/Domaine/delDomaine';
import AllDomaines from './Components/Domaine/getDomaines';
import UpdateDomaine from './Components/Domaine/updateDomaine';
import OneDomaine from './Components/Domaine/getOneDomaine';
import Login from './Components/Login';
import Home from './Components/Dashboard/Home';
import AddDomaine from './Components/Domaine/AddDomaine/addDomaine';





function App() {
  return (
      <Router>
        <div className="App">

          <Routes>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/addDomaine" element={<AddDomaine/>}/>
            <Route exact path="/deleteDomaine" element={DeleteDomaine}/>
            <Route exact path="/updateDomaine/:id" element={UpdateDomaine}/>
            <Route exact path="/allDomaines" element={<AllDomaines/>}/>
            <Route exact path="/oneDomaine" element={OneDomaine}/>
            <Route exact path="/" element={<Login/>}/>      
          </Routes>    
        </div>
      </Router>  
      
  );
}

export default App;
