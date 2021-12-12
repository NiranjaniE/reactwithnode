import React from 'react';  
import logo from './logo.svg';  
import './App.css';  
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import Employee from './Employee';


function App() {  
  return (  
    <div className="App">  
     <Router>    
      <div className="container">    
        <nav className="btn btn-warning navbar navbar-expand-lg navheader">    
          <div className="collapse navbar-collapse" >    
      
            <ul className="navbar-nav mr-auto">    
              <li className="nav-item">    
                <Link to={'/Employee'} className="nav-link">Employee</Link>    
              </li>    
              
            </ul>    
          </div>    
        </nav> <br />    
        <Switch>    
          <Route exact path='/Employee' component={Employee } />    
           
        </Switch>    
      </div>    
    </Router>    
    </div>  
  );  
}  
export default App;  