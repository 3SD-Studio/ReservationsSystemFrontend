import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from './Calendar';

test('renders calendar with correct month and year', () => {
  render(<Calendar />);
  
  const currentDate = new Date();

  let monthArray = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  const monthHeader = screen.getByText(monthArray[currentDate.getMonth()] + " 2024");
  expect(monthHeader).toBeInTheDocument();
  
  
  const expectedMonthYear = `${monthArray[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  expect(monthHeader.textContent).toBe(expectedMonthYear);
});

// test('changes month when previous or next button is clicked', () => {
//   render(<Calendar />);
  
//   const previousButton = screen.getByText(/</i);
//   const nextButton = screen.getByText(/>/i);
//   const monthHeader = screen.getByText(/month/i);
  
//   fireEvent.click(nextButton);
//   expect(monthHeader.textContent).toBe('Next Month Year'); // Replace with the expected month and year
  
//   fireEvent.click(previousButton);
//   expect(monthHeader.textContent).toBe('Previous Month Year'); // Replace with the expected month and year
// });

// test('calls handleSetDay and handleSetEvent when a day button is clicked', () => {
//   const mockHandleSetDay = jest.fn();
//   const mockHandleSetEvent = jest.fn();
  
//   render(<Calendar handleSetDay={mockHandleSetDay} handleSetEvent={mockHandleSetEvent} />);
  
//   const dayButton = screen.getByText(/day/i);
//   fireEvent.click(dayButton);
  
//   expect(mockHandleSetDay).toHaveBeenCalledTimes(1);
//   expect(mockHandleSetEvent).toHaveBeenCalledTimes(1);
// });
