import React from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import Sidebar from './navbar'
import JournalsAll from './views/journalsAll/index'
import Journal from './views/journal/index'
import NewEntry from './views/newentry/index'
import JournalEntry from './views/entry/index'

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
            <Route path="/journals/:jid/:entryid">
              <JournalEntry />        
            </Route>
            <Route path="/journals/:jid">
              <Journal />        
            </Route>
            <Route path="/journals">
              <JournalsAll />        
            </Route>
            <Route path="/newentry">
              <NewEntry />          
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
