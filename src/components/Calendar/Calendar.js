import { useState, useEffect } from 'react'

import './Calendar.css'
import { fetchEvents } from '../../functions/ApiUtils'

/**
 * React component representing a calendar with events for current week, 
 * next two weeks, and two previous weeks.
 * 
 * @param {Object} props - Component props.
 * @param {Function} props.handleSetDay - Function to handle setting the selected day.
 * @param {string} props.children - Room ID for fetching events.
 * @param {Function} props.handleSetEvent - Function to handle setting fetched events.
 * @returns {JSX.Element} Calendar component.
 */
export function Calendar(props) {
  const [calendar, setCalendar] = useState([[{}]])
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    setCalendar(generateCalendar(date.getFullYear(), date.getMonth()))
  }, [])

  const changeMonth = (difference) => {
    const newDate = new Date(date) // Create a new date object
    newDate.setMonth(newDate.getMonth() + difference) // Update the month
    setDate(newDate)
    setCalendar(generateCalendar(newDate.getFullYear(), newDate.getMonth()))
  }

  if (calendar === undefined) {
    return <h1>LOADING</h1>
  }
  else
    return (
      <div className='calendarDiv'>
        <div className="month-header">
          <button onClick={() => {changeMonth(-1)}}>&lt;</button>
          <h1>{getMonthString(date.getMonth())} {date.getFullYear()}</h1>
          <button onClick={() => {changeMonth(+1)}}>&gt;</button>
        </div>
        <table className="calendarTable">
          <tr>
            <th>MO</th>
            <th>TU</th>
            <th>WE</th>
            <th>TH</th>
            <th>FR</th>
            <th>SA</th>
            <th>SU</th>
          </tr>
          {calendar.map((week) => (
            <tr>
              {week.map((day) => (
                <td >
                  <button className={day.today ? "calendar-item today" : "calendar-item"}
                    onClick={() => {
                      props['hadnleSetDay'](day)
                      fetchEvents(day, props['children'], props['handleSetEevent'])
                    }
                    }>
                    {day.day}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    )
}

/**
 * Function maps index of month to its name.
 * 
 * @param {number} month - Month number (0-indexed).
 * @returns {string} Month name.
 */
const getMonthString = (month) => {
  let array = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

    console.log(month)
    console.log(array[month])
  return array[month];
}

/**
 * Function to generate the calendar for a given year and month.
 * 
 * @param {number} year - Year.
 * @param {number} month - Month (0-indexed).
 * @returns {Array<Array<Object>>} Generated calendar.
 */
const generateCalendar = (year, month) => {
  let isCurrentMonth = (year === new Date().getFullYear() && month === new Date().getMonth());
  const fixSunday = (day) => {
    return day === 0 ? 7 : day;
  }

  year = new Date().getFullYear();
  let firstDayOfMonth = fixSunday(new Date(year, month, 1).getDay());
  let daysInMonth = new Date(year, month + 1, 0).getDate();
  let daysInPreviousMonth = new Date(year, month, 0).getDate();
  let today = new Date().getDate();

  let counter = 0;
  let start = daysInPreviousMonth - firstDayOfMonth + 2;

  month++;
  let calendar = [[], [], [], [], []]

  let fixYear = month === 1 ? -1 : 0;
  for (let i = start; i <= daysInPreviousMonth; i++) {
    if (!calendar[0]) calendar[0] = []; // Ensure array exists
    calendar[0].push(
      {
        day: i,
        month: month - 1 === 0 ? 12 : month - 1,
        year: year + fixYear,
        today: false,
      }
    );
    counter++;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    if (!calendar[Math.floor(counter / 7)]) calendar[Math.floor(counter / 7)] = []; // Ensure array exists
    calendar[Math.floor(counter / 7)].push(
      {
        day: i,
        month: month,
        year: year,
        today: i === today && isCurrentMonth ? true : false,
      }
    );
    counter++;
  }

  fixYear = month === 12 ? 1 : 0;
  for (let i = 1; counter < 35; i++) {
    if (!calendar[Math.floor(counter / 7)]) calendar[Math.floor(counter / 7)] = []; // Ensure array exists
    calendar[Math.floor(counter / 7)].push(
      {
        day: i,
        month: (month + 1) % 12,
        year: year + fixYear,
        today: false,
      });
    counter++;
  }
  return calendar;
}