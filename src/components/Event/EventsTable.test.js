import { render, screen, fireEvent } from '@testing-library/react';
import { EventsTable } from './EventsTable';
import { MemoryRouter } from 'react-router-dom';

describe('EventsTable tests', () => {
  test('renders upcoming events header when currentDay year is -1', () => {
    const props = {
      events: [],
      day: { year: -1 },
      handleAddEvent: jest.fn(),
    };

    render(<MemoryRouter><EventsTable {...props} /></MemoryRouter>);

    expect(screen.getByText('Upcoming events')).toBeInTheDocument();
    expect(screen.queryByText('Add')).toBeNull();
  });

  test('renders current day header and add button when currentDay year is not -1', () => {
    const props = {
      events: [],
      day: { year: 2022, month: 1, day: 1 },
      handleAddEvent: jest.fn(),
    };

    render(<MemoryRouter><EventsTable {...props} /></MemoryRouter>);

    expect(screen.getByText('1 January 2022')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('calls handleAddEvent when add button is clicked', () => {
    const handleAddEvent = jest.fn();
    const props = {
      events: [],
      day: { year: 2030, month: 1, day: 1 }, // change in 2030 
      handleAddEvent: handleAddEvent,
    };

    render(<MemoryRouter><EventsTable {...props} /></MemoryRouter>);

    fireEvent.click(screen.getByText('Add'));

    expect(handleAddEvent).toHaveBeenCalled();
  });

  test('disables add button when currentDay is in the past', () => {
    const props = {
      events: [],
      day: { year: 2022, month: 1, day: 1 },
      handleAddEvent: jest.fn(),
    };

    render(<MemoryRouter><EventsTable {...props} /></MemoryRouter>);

    expect(screen.getByText('Add')).toBeDisabled();
  });

  test('renders "LOADING" when events prop is undefined', () => {
    const props = {
      events: undefined,
      day: { year: -1 },
      handleAddEvent: jest.fn(),
    };

    render(<MemoryRouter><EventsTable {...props} /></MemoryRouter>);

    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });
});