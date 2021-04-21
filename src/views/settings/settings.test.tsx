import React from 'react';
import Settings from './index';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// import react-testing methods
import { render, fireEvent, waitFor, screen, wait, getByPlaceholderText } from '@testing-library/react'



test('Settings Page', async() => {
  render(<Settings />);
  const pageTitle = screen.getByText('Settings');
  const Name = screen.getByText('Name');
  const Username = screen.getByText('Username');
  const Email = screen.getByText('Email');
  expect(pageTitle).toBeInTheDocument();
  expect(Name).toBeInTheDocument();
  expect(Username).toBeInTheDocument();
  expect(Email).toBeInTheDocument();

//   //on create modal component
//   fireEvent.click(screen.getByTestId('bottom-addjournal'))
  
//   await waitFor(() => screen.getByTestId("createjournalmodal"))
//   const nameInput = screen.getByPlaceholderText('Journal Name')

//   expect(screen.getByTestId("modaltitle")).toHaveTextContent('Create a New Journal')

//   fireEvent.change(nameInput, {target: {value: "My new journal"}})

//   await waitFor(() => screen.getByDisplayValue("My new journal"))

//   expect(screen.getByDisplayValue("My new journal")).toBeInTheDocument

//   fireEvent.click(screen.getByTestId('save'));

//   expect(screen.queryByTestId("bottom-modal")).toBeNull()


  // await waitFor(() => screen.getByText("My new journal"))

//   expect(screen.getByTestId("journalsTable")).toHaveTextContent("My new journal")



});
