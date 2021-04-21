import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './index';

test('Login', () => {
  render(<Login />);
  const header = screen.getByTestId('loginheader');
  const username = screen.getByLabelText('Username');
  const password = screen.getByLabelText('Password');
  expect(header).toBeInTheDocument();
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});
