import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { useQuery} from '../../functions/Tools';
import { fetchEventData, saveEventChanges } from '../../functions/ApiUtils';
import { EventPage } from './EventPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../functions/Tools', () => ({
    ...jest.requireActual('../../functions/Tools'),
    useQuery: jest.fn(),
}));

jest.mock('../../functions/ApiUtils', () => ({
  fetchEventData: jest.fn(),
  saveEventChanges: jest.fn(),
}));

describe('EventPage tests', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' });
    useQuery.mockReturnValue({ get: (str) => "AAA"});
  });

  test('renders loading state when event is undefined', () => {
    render(<EventPage />);
    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });

  test('renders event form correctly without save option', () => {
    const event = {
      id: 1,
      name: 'Event 1',
      link: 'https://example.com',
      description: 'Event 1 description',
      begin: new Date('2022-01-01T10:00:00Z'),
      end: new Date('2022-01-01T12:00:00Z'),
    };

    useQuery.mockReturnValue({get: (str) => undefined})

    fetchEventData.mockImplementation((id, setEvent, setDateAndTime) => {
      setEvent(event);
      setDateAndTime(event);
    });

    render(
      <MemoryRouter>
        <EventPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Name')).toHaveValue(event.name);
    expect(screen.getByLabelText('Link')).toHaveValue(event.link);
    expect(screen.getByLabelText('Description')).toHaveValue(event.description);
    expect(screen.getByLabelText('Date')).toHaveValue('2022-01-01');
    expect(screen.getByLabelText('Start')).toHaveValue('11:00');
    expect(screen.getByLabelText('End')).toHaveValue('13:00');
    const submitButton = screen.queryByText('Save')
    expect(submitButton).toBeNull()
  });

  test('renders event form correctly with save option', () => {
    const event = {
      id: 1,
      name: 'Event 1',
      link: 'https://example.com',
      description: 'Event 1 description',
      begin: new Date('2022-01-01T10:00:00Z'),
      end: new Date('2022-01-01T12:00:00Z'),
    };

    fetchEventData.mockImplementation((id, setEvent, setDateAndTime) => {
      setEvent(event);
      setDateAndTime(event);
    });

    render(
      <MemoryRouter>
        <EventPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Name')).toHaveValue(event.name);
    expect(screen.getByLabelText('Link')).toHaveValue(event.link);
    expect(screen.getByLabelText('Description')).toHaveValue(event.description);
    expect(screen.getByLabelText('Date')).toHaveValue('2022-01-01');
    expect(screen.getByLabelText('Start')).toHaveValue('11:00');
    expect(screen.getByLabelText('End')).toHaveValue('13:00');
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test('updates event state when input values change', () => {
    const event = {
      id: 1,
      name: 'Event 1',
      link: 'https://example.com',
      description: 'Event 1 description',
      begin: new Date('2022-01-01T10:00:00Z'),
      end: new Date('2022-01-01T12:00:00Z'),
    };

    fetchEventData.mockImplementation((id, setEvent, setDateAndTime) => {
      setEvent(event);
      setDateAndTime(event);
    });

    render(
      <MemoryRouter>
        <EventPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Event 1' } });
    fireEvent.change(screen.getByLabelText('Link'), { target: { value: 'https://updated-example.com' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Updated Event 1 description' } });

    expect(screen.getByLabelText('Name')).toHaveValue('Updated Event 1');
    expect(screen.getByLabelText('Link')).toHaveValue('https://updated-example.com');
    expect(screen.getByLabelText('Description')).toHaveValue('Updated Event 1 description');
  });

  test('calls saveEventChanges function when Save button is clicked', () => {
    const event = {
      id: 1,
      name: 'Event 1',
      link: 'https://example.com',
      description: 'Event 1 description',
      begin: new Date('2022-01-01T10:00:00Z'),
      end: new Date('2022-01-01T12:00:00Z'),
    };

    fetchEventData.mockImplementation((id, setEvent, setDateAndTime) => {
      setEvent(event);
      setDateAndTime(event);
    });

    render(
      <MemoryRouter>
        <EventPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Save'));

    expect(saveEventChanges).toHaveBeenCalledWith(
      event,
      '2022-01-01',
      '11:00',
      '13:00',
      expect.any(Object)
    );
  });
});