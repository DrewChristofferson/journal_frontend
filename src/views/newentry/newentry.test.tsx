import React from 'react';
import NewEntry from './index';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// import react-testing methods
import { render, fireEvent, waitFor, screen, wait, getByPlaceholderText } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router';
import { BrowserRouter as Router} from 'react-router-dom'
import Input from '../../Components/Input/Input';

// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/api/v1/record/', (req, res: any, ctx: any) => {
      
        // respond using a mocked JSON body
      return res(ctx.json({ 
            "record_id": '1234',
            "journal_id": '1234',
            "record_title": 'New Entry',
            "createdAt": Date.now(),
            "updatedAt": Date.now(),
            "content": 'Some Content'
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



test('renders New Entry', async() => {
  render(
    <MemoryRouter>
      <Router>
        <NewEntry />
      </Router>
    </MemoryRouter>
  )
//   await waitFor(() => screen.getByTestId("editor"))
  const title = screen.getByTestId('title')
  const form = screen.getByTestId('form')
//   const editor = screen.getByTestId('editor')
  const cancel = screen.getByTestId('cancel')
  const input = screen.getByPlaceholderText('Title');


  fireEvent.change(input, {target: {value: "My Entry"}})

  expect(title).toBeInTheDocument()
  expect(form).toBeInTheDocument()
//   expect(editor).toBeInTheDocument()
  expect(cancel).toBeInTheDocument()


  fireEvent.click(cancel)

})


test('submit New Entry', async() => {
  render(
    <MemoryRouter>
      <Router>
        <NewEntry />
      </Router>
    </MemoryRouter>
  )

  const done = screen.getByTestId('done')
  const input = screen.getByPlaceholderText('Title');


  fireEvent.change(input, {target: {value: "My Entry"}})

  expect(done).toBeInTheDocument()


  fireEvent.click(done)

})



