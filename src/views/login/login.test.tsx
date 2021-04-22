import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './index';
import JournalsAll from '../journalsAll'
import { BrowserRouter as Router} from 'react-router-dom'
import { MemoryRouter, Route } from 'react-router';
import SignUp from '../signup'

test('Login', async() => {
  render(<Login />);
  const header = screen.getByTestId('loginheader');
  const username = screen.getByLabelText('Username');
  const password = screen.getByLabelText('Password');
  expect(header).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();

  fireEvent.change(username, {target: {value: "drew"}})
  fireEvent.change(password, {target: {value: "password"}})
  expect(screen.getByDisplayValue("drew")).toBeInTheDocument();
  expect(screen.getByDisplayValue("password")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('loginbutton'));

  await waitFor(() => render(<JournalsAll />));
  await waitFor(() => screen.getByTestId("title"));
});


test('Login to Signup', async() => {
  render(
    <MemoryRouter>
      <Router>
        <Login />
      </Router>
    </MemoryRouter>
  );
  const tosignup = screen.getByTestId('tosignup');
  expect(tosignup).toBeInTheDocument();

  await waitFor(() => render(
    <MemoryRouter>
      <Router>
        <SignUp />
      </Router>
    </MemoryRouter>
  ));

  const header = screen.getByTestId('signupheader');
  expect(header).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('tologin'));

});
