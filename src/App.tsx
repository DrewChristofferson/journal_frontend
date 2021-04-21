import React, { useContext, ReactNode } from 'react';
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
import CreateNewEntry from './views/createnewentry/index'
import Settings from './views/settings/index'

const AppContainer = styled.div`
  margin-left: 400px;
  margin-top: 50px;
  margin-right: 100px;
`
interface IProps {
  children: ReactNode;
  // any other props that come into the component
}

function PrivateRoute({ children, ...rest }: any) {
  const context = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  
  
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />          
        </Route>
        <Route path="/signup">
          <SignUp />          
        </Route>
        <PrivateRoute path="/">
          <Sidebar />
          <AppContainer>
              <Switch>
              <Route path="/journals/:jid/newentry">
                  <NewEntry />        
                </Route>
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
                <Route path="/createnewentry">
                  <CreateNewEntry />          
                </Route>
                <Route path="/settings">
                  <Settings />          
                </Route>
                
                <Route path="/">
                  <Redirect to="/journals" />
                </Route>
              </Switch>
            </AppContainer>
        </PrivateRoute>
      </Switch>
      
        
     </Router>
  );
}

export default App;
