import React from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import Sidebar from './navbar'
import Journal from './views/journal/index'

const AppContainer = styled.div`
  margin-left: 400px;
  margin-top: 50px;
  margin-right: 100px;
`

function App() {
  return (
    <Router>
      <Sidebar />
      <AppContainer>
          <Switch>
            <Route path="/journals">
              <Journal />        
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
