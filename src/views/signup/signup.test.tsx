import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from './index';
import JournalsAll from '../journalsAll';

test('Signup', async() => {
  render(<Signup />);
  const header = screen.getByTestId('signupheader');
  const name = screen.getByLabelText('Name');
  const email = screen.getByLabelText('Email');
  const username = screen.getByLabelText('Username');
  const password = screen.getByLabelText('Password');
  expect(header).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();


  fireEvent.change(name, {target: {value: "Drew Christofferson"}})
  fireEvent.change(email, {target: {value: "drew@gmail.com"}})
  fireEvent.change(username, {target: {value: "drewc123test"}})
  fireEvent.change(password, {target: {value: "password"}})
  expect(screen.getByDisplayValue("Drew Christofferson")).toBeInTheDocument();
  expect(screen.getByDisplayValue("drew@gmail.com")).toBeInTheDocument();
  expect(screen.getByDisplayValue("drewc123test")).toBeInTheDocument();
  expect(screen.getByDisplayValue("password")).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('signupbutton'));

  await waitFor(() => render(<JournalsAll />));
  await waitFor(() => screen.getByTestId("title"));
});
