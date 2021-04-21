import React from 'react';
import Journals from './index';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// import react-testing methods
import { render, fireEvent, waitFor, screen, wait, getByPlaceholderText } from '@testing-library/react'

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/api/vi/journal/user', (req, res: any, ctx: any) => {
      // respond using a mocked JSON body
      return res(ctx.json({ 
            "journal_id": '1234',
            "journal_name": 'my journal',
            "createdAt": Date.now(),
            "updatedAt": Date.now(),
            "user_id": '123',
        }
    ))
    })
  )

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())



test('renders My Journals', async() => {
  render(<Journals />);
  const pageTitle = screen.getByTestId('title');
  expect(pageTitle).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('bottom-addjournal'))
  
  await waitFor(() => screen.getByTestId("createjournalmodal"))
  const nameInput = screen.getByPlaceholderText('Journal Name')

  expect(screen.getByTestId("modaltitle")).toHaveTextContent('Create a New Journal')

  fireEvent.change(nameInput, {target: {value: "My new journal"}})

//   expect(nameInput.nodeValue).toBe("My new journal")

  fireEvent.click(screen.getByTestId('save'));

//   await waitFor(() => screen.getByText("My new journal"))

//   expect(screen.getByTestId("journalsTable")).toHaveTextContent("My new journal")



});
