import React from 'react';
import Entry from './index';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// import react-testing methods
import { render, fireEvent, waitFor, screen, wait, getByPlaceholderText } from '@testing-library/react';
import AppProvider from '../../context/context-provider';
import { MemoryRouter, Route } from 'react-router';
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
    <MemoryRouter initialEntries={["/journal/jid/eid"]}>
        <Route path="/journal/:jid/:eid">
            <Entry  />
        </Route>
    </MemoryRouter>
    );
    const title = screen.getByTestId('title');
    expect(title).toBeInTheDocument();
    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('editbutton'));
    await waitFor(() => screen.getByTestId("editdone"));

    fireEvent.click(screen.getByTestId('editdone'));

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