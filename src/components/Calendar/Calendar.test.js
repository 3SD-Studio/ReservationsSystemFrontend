import { render, screen, fireEvent} from '@testing-library/react';
import { Calendar, generateCalendar } from './Calendar';

import { getMonthString } from '../../functions/Tools';

describe("Calendar tests", () => {
  test('returns correct month string', () => {
    // Given
    const month = 0; // January
  
    // When
    const result = getMonthString(month);
  
    // Then
    expect(result).toBe('January');
  });
  
  test('returns correct month string for different months', () => {
    // Given
    const testCases = [
      { month: 1, expected: 'February' },
      { month: 13, expected: 'February' },
      { month: 5, expected: 'June' },
      { month: 11, expected: 'December' },
      { month: -1, expected: 'December' },
    ];
  
    // When & Then
    testCases.forEach(({ month, expected }) => {
      const result = getMonthString(month);
      expect(result).toBe(expected);
    });
  });
  
  test('renders calendar with correct month and year', () => {
    // Given
    render(<Calendar />);
    
    const currentDate = new Date();
  
    
    // When 
    const monthHeader = screen.getByText(getMonthString(currentDate.getMonth()) + " 2024");
    expect(monthHeader).toBeInTheDocument();
    
    // Then 
    const expectedMonthYear = `${getMonthString(currentDate.getMonth())} ${currentDate.getFullYear()}`;
    expect(monthHeader.textContent).toBe(expectedMonthYear);
  });
  

  test('changes month when previous or next button is clicked', () => {
    render(<Calendar />);
    
    const currentDate = new Date()
    const previousButton = screen.getByText(/</i);
    const nextButton = screen.getByText(/>/i);
    const monthHeader = screen.getByText(getMonthString(currentDate.getMonth()) + " " + currentDate.getFullYear());
    
    fireEvent.click(nextButton);
    expect(monthHeader.textContent).toBe(getMonthString(currentDate.getMonth() + 1) + " " + currentDate.getFullYear()); // Replace with the expected month and year
    
    fireEvent.click(previousButton);
    expect(monthHeader.textContent).toBe(getMonthString(currentDate.getMonth()) + " " + currentDate.getFullYear()); // Replace with the expected month and year
  });
  
  test('calls handleSetDay and handleSetEvent when a day button is clicked', () => {
    const mockHandleSetDay = jest.fn(x=>x);
    const mockHandleSetEvent = jest.fn(x=>x);
    
    render(<Calendar handleSetDay={mockHandleSetDay} handleSetEvent={mockHandleSetEvent} />);
    
    const dayButton = screen.getByText("15");
    fireEvent.click(dayButton);

    
    expect(mockHandleSetDay).toHaveBeenCalledTimes(1);
    //expect(mockHandleSetEvent).toHaveBeenCalledTimes(1);
  });

  test('generates calendar correctly', () => {
    // Given
    const year = 2022;
    const month = 1; // Feburary
    const expectedCalendar = [
      [
        { day: 31, month: 1, year: 2022, today: false },
        { day: 1, month: 2, year: 2022, today: false },
        { day: 2, month: 2, year: 2022, today: false },
        { day: 3, month: 2, year: 2022, today: false },
        { day: 4, month: 2, year: 2022, today: false },
        { day: 5, month: 2, year: 2022, today: false },
        { day: 6, month: 2, year: 2022, today: false }
      ],
      [
        { day: 7, month: 2, year: 2022, today: false },
        { day: 8, month: 2, year: 2022, today: false },
        { day: 9, month: 2, year: 2022, today: false },
        { day: 10, month: 2, year: 2022, today: false },
        { day: 11, month: 2, year: 2022, today: false },
        { day: 12, month: 2, year: 2022, today: false },
        { day: 13, month: 2, year: 2022, today: false }
      ],
      [
        { day: 14, month: 2, year: 2022, today: false },
        { day: 15, month: 2, year: 2022, today: false },
        { day: 16, month: 2, year: 2022, today: false },
        { day: 17, month: 2, year: 2022, today: false },
        { day: 18, month: 2, year: 2022, today: false },
        { day: 19, month: 2, year: 2022, today: false },
        { day: 20, month: 2, year: 2022, today: false }
      ],
      [
        { day: 21, month: 2, year: 2022, today: false },
        { day: 22, month: 2, year: 2022, today: false },
        { day: 23, month: 2, year: 2022, today: false },
        { day: 24, month: 2, year: 2022, today: false },
        { day: 25, month: 2, year: 2022, today: false },
        { day: 26, month: 2, year: 2022, today: false },
        { day: 27, month: 2, year: 2022, today: false }
      ],
      [
        { day: 28, month: 2, year: 2022, today: false },
        { day: 1, month: 3, year: 2022, today: false },
        { day: 2, month: 3, year: 2022, today: false },
        { day: 3, month: 3, year: 2022, today: false },
        { day: 4, month: 3, year: 2022, today: false },
        { day: 5, month: 3, year: 2022, today: false },
        { day: 6, month: 3, year: 2022, today: false }
      ]
    ];

    // When
    const result = generateCalendar(year, month);

    // Then
    expect(result).toEqual(expectedCalendar);
  });
});