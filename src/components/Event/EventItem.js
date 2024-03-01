import React from 'react';
import { useNavigate } from 'react-router-dom';

import { fixMinutesString } from '../../functions/Tools';

import './EventItem.css'


/**
 * Renders a list of event items.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.events - The array of events to render.
 * @returns {JSX.Element} The rendered event items.
 */
export function EventItem(props) {
  const navigate = useNavigate();

  return (
    props['events'].map((event, id) => {
      return (
        <div className="grid-container eventDiv" onClick={() => navigate('/event/' + event['id'])} data-testid="event-item" key={id}>
          <h4 className="item1 title">{event['name']}</h4>
          <h4 className="item2 date">{new Date(event['begin']).toLocaleDateString()}</h4>
          <p className="item3 description">{event['description']}</p>
          <div className='item4 time'>Start: {new Date(event['begin']).getUTCHours()}:{
              fixMinutesString(new Date(event['begin']).getUTCMinutes())
            }
          </div>
          <div className='item5 time'> End: {new Date(event['end']).getUTCHours()}:{
            fixMinutesString(new Date(event['end']).getUTCMinutes())
          }
          </div>
        </div>
      )
    })
  )
}



