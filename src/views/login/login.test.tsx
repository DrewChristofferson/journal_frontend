import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './index';

test('renders DevJournal', () => {
  render(<Login />);
  const promoTitle = screen.getByText('DevJournal');
  expect(promoTitle).toBeInTheDocument();
});
