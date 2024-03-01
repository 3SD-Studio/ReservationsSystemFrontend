import { render, screen } from '@testing-library/react';
import { EventItem } from './EventItem';
import { MemoryRouter } from 'react-router-dom'

import { fixMinutesString as fixMinutes} from '../../functions/Tools';

describe("EventItem tests", () => {
  test('renders event item correctly', () => {
    // Given
    const events = [
      {
        id: 1,
        name: 'Event 1',
        begin: new Date('2022-01-01T10:00:00Z'),
        end: new Date('2022-01-01T12:00:00Z'),
        description: 'Event 1 description'
      },
      {
        id: 2,
        name: 'Event 2',
        begin: new Date('2022-01-02T14:00:00Z'),
        end: new Date('2022-01-02T16:00:00Z'),
        description: 'Event 2 description'
      }
    ];
    
    // When
    render(<MemoryRouter><EventItem events={events} /></MemoryRouter>);
    
    // Then
    const eventElements = screen.getAllByTestId('event-item');
    expect(eventElements).toHaveLength(events.length);

    events.forEach((event, index) => {
      const eventElement = eventElements[index];
      expect(eventElement).toHaveTextContent(event.name);
      expect(eventElement).toHaveTextContent(event.description);
      expect(eventElement).toHaveTextContent(new Date(event.begin).toLocaleDateString());
      expect(eventElement).toHaveTextContent(`Start: ${new Date(event.begin).getUTCHours()}:${fixMinutes(new Date(event.begin).getUTCMinutes())}`);
      expect(eventElement).toHaveTextContent(`End: ${new Date(event.end).getUTCHours()}:${fixMinutes(new Date(event.end).getUTCMinutes())}`);
    });
  });
});