import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import Sidebar from './navbar'

const AppContainer = styled.div`
  padding-left: 300px;
`

function App() {
  return (
    <Router>
      <Sidebar />
      <AppContainer>
          <Switch>
            <Route path="/journals">
              <div>
                Journals
              </div>           
            </Route>
            <Route path="/newentry">
              <div>
                New Entries  
              </div>           
            </Route>
            <Route path="/settings">
              <div>
                Settings Screen   
              </div>           
            </Route>
            <Route path="/">
              Home
            </Route>
          </Switch>
      </AppContainer>
        
        
    </Router>
  );
}

export default App;
