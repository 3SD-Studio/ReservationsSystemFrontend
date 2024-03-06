import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';
import { fetchUserData, fetchUserEvents } from '../../functions/ApiUtils';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../functions/ApiUtils', () => ({
  fetchUserData: jest.fn(),
  fetchUserEvents: jest.fn()
}));

describe('Profile tests', () => {
  test('renders "LOADING" when currentUser is undefined', () => {
    const props = {
      currentUser: undefined,
      userEvents: [],
    };

    render(<Profile {...props} />);

    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });

  test('renders "LOADING" when currentUser is null', () => {
    const props = {
      currentUser: null,
      userEvents: [],
    };

    render(<Profile {...props} />);

    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });

  test('renders profile information when currentUser is defined', () => {
    fetchUserData.mockImplementation((setUserData) => setUserData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    }))

    render(<Profile />);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('First name: John')).toBeInTheDocument();
    expect(screen.getByText('Last name: Doe')).toBeInTheDocument();
    expect(screen.getByText('email: john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Upcoming events:')).toBeInTheDocument();
  });

  test('renders "LOADING" when userEvents is undefined', () => {
    fetchUserData.mockImplementation((setUserData) => setUserData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    }))

    render(<Profile/>);

    expect(screen.getByText('Upcoming events:')).toBeInTheDocument();
    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });

  test('renders EventItem when userEvents is defined', () => {
    fetchUserData.mockImplementation((setUserData) => setUserData({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    }))

    fetchUserEvents.mockImplementation((setUserEvent) => setUserEvent([
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' },
    ]))

    render(<MemoryRouter><Profile /></MemoryRouter>);

    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
  });
});