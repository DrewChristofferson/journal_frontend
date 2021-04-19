import React, { useContext } from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import AppContext from './context/context'
import './App.css';
import Sidebar from './navbar'
import JournalsAll from './views/journalsAll/index'
import Journal from './views/journal/index'
import NewEntry from './views/newentry/index'
import JournalEntry from './views/entry/index'
import Login from './views/login/index'
import SignUp from './views/signup/index'

const AppContainer = styled.div`
  margin-left: 400px;
  margin-top: 50px;
  margin-right: 100px;
`

function App() {
  const context = useContext(AppContext);
  
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />          
        </Route>
        <Route path="/signup">
          <SignUp />          
        </Route>
        <Route path="/">
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
                  <Redirect to="/journals" />
                </Route>
              </Switch>
            </AppContainer>
        </Route>
      </Switch>
      
        
        
    </Router>
  );
}

export default App;
