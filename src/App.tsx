import styled from 'styled-components'
import { Switch, Route, Redirect } from "react-router-dom"
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

function PrivateRoute({ children, ...rest }: any) {
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
  );
}

export default App;
