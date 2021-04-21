import React from 'react';
import CreateNewEntry from './index';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// import react-testing methods
import { render, fireEvent, waitFor, screen, wait, getByPlaceholderText } from '@testing-library/react'
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



test('renders Create New Entry', async() => {
  render(<CreateNewEntry />)
  const newEntryTitle = screen.getByTestId('newEntryTitle')
  const entryInput = screen.getByTestId('entryInput')
  const dropdown = screen.getByTestId('selectjournaldropdown')
  const saveButton = screen.getByTestId('saveButton')
  const cancelButton = screen.getByTestId('cancelButton')

//   const createEntryInput = screen.getByTestId('createEntryInput') //this isn't working

  expect(newEntryTitle).toBeInTheDocument()
  expect(entryInput).toBeInTheDocument()
  expect(dropdown).toBeInTheDocument()
  
  expect(newEntryTitle).toHaveTextContent('Create a New Entry')
  expect(dropdown).toHaveAttribute('hidden')
  expect(entryInput).toHaveAttribute('placeholder')

  fireEvent.click(dropdown)

  //test changing inputs
  fireEvent.change(entryInput, {target: {value: "This is an entry title!"}})
  //   fireEvent.change(createEntryInput, {target: {value: "This is entry content!"}})

  expect(screen.getByText('Create a New Entry')).toBeInTheDocument()
  expect(screen.getByDisplayValue('This is an entry title!')).toBeInTheDocument()


  //test button functionality
  fireEvent.click(saveButton)
//   expect(fireEvent.click(cancelButton)).toHaveReturnedWith(200) //this one isnt' working

})



