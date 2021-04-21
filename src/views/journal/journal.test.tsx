import React from 'react';
import Journal from './index';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import react-testing methods
import { render, fireEvent, waitFor, screen, wait, getByPlaceholderText } from '@testing-library/react';
import AppProvider from '../../context/context-provider';
import { MemoryRouter, Route, browserHistory } from 'react-router';
import NewEntry from '../newentry';

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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Render Journal', async () => {
    render(
    <MemoryRouter initialEntries={["/journal/jid"]}>
        <Route path="/journal/:jid">
            <Journal  />
        </Route>
    </MemoryRouter>
    );
    const bc = screen.getByTestId('bc');
    expect(bc).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('addrecord'));
    await waitFor(() => {
        render(
            <MemoryRouter initialEntries={["/journal/jid/newentry"]}>
            <Route path="/journal/:jid.newentry">
                <NewEntry />
            </Route>
        </MemoryRouter>
        )
    })
    // const page = screen.getByText('Create a New Entry');
    // expect(page).toBeInTheDocument();

    // const title = screen.getAllByPlaceholderText('Title');
    // const content = screen.get
}
)

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
//     useParams: () => ({
//       companyId: 'company-id1',
//       teamId: 'team-id1',
//     }),
//     useRouteMatch: () => ({ url: '/company/company-id1/team/team-id1' }),
//   }));