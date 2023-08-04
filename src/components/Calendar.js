import { useState, useEffect } from 'react'

import './Calendar.css'

export function Calendar(room) {
  const [month, setMonth] = useState(getMonthString(new Date().getMonth()))
  const [events, setEvents] = useState([{}])
  const [calendar, setCalendar] = useState([[{}]])
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
      'Accept': 'application/json'
    },
  };
    
  const fetchEventsData = () => {
    fetch("http://127.0.0.1:5000/room/" + room['children'] + "/events", requestOptions)
      .then(response => response.json())
      .then(result => setEvents(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchEventsData()
    setCalendar(generateCalendar(new Date().getFullYear(), new Date().getMonth(), events))
  }, [])
  
  if (calendar === undefined) {
    return <h1>LOADING</h1>
  }
  else 
  return (
    <div className='calendarDiv'>
      <h1>Calendar</h1>
      <h2>{month}  {new Date().getFullYear()}</h2>
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
                <div className={day.today ? "today" : "calendarItem"} onClick={() => {
                  setEventsTableHeader(day)
                  insertEvents(day)
                }}>
                  <div className='calendarItemText'>{day.day}</div>
                </div>
              </td>
           ))}
          </tr>
          ))}
        </table>
    </div>
  )
}

const setEventsTableHeader = (day) => {
  document.getElementById('eventsTableHeader').innerHTML = day.day + ' ' + getMonthString(day.month - 1) + ' ' + day.year
}

const insertEvents = (day) => {
  
  document.getElementById('eventTable').innerHTML = ''
  for (let i = 0; i < 10; i++) {
    document.getElementById('eventTable').innerHTML += '<h1>TEST' + i +'</h1>'
  }
}

const getMonthString = (month) => {
  let array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
               'October', 'November', 'December']
  return array[month]
}


const generateCalendar = (year, month, events) => {
  let isCurrentMonth = (year === new Date().getFullYear() && month === new Date().getMonth()) ? true : false;
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
  let calendar = [[],[],[],[],[]]
  
  let fixYear = month === 1 ? -1 : 0;
  for (let i = start; i <= daysInPreviousMonth; i++) {
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