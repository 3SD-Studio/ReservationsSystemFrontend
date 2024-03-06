import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventPopup, CreateEvent, EventInfo } from './EventPopup';
import { postEvent } from '../../functions/ApiUtils';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../functions/ApiUtils', () => ({
  postEvent: jest.fn()
}));

describe('EventPopup tests', () => {
  test('renders CreateEvent component when event is not created', () => {
    render(<EventPopup roomId="1" handleClose={() => { }}>{{ 'day': -1, 'month': -1, 'year': -1 }}</EventPopup>);
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Link:')).toBeInTheDocument();
    expect(screen.getByLabelText('Start:')).toBeInTheDocument();
    expect(screen.getByLabelText('End:')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Add event')).toBeInTheDocument();
  });

  test('renders EventInfo component when event is created', () => {
    render(<MemoryRouter><EventPopup roomId="1" handleClose={() => {}}>{{'day': -1, 'month': -1, 'year': -1}}</EventPopup></MemoryRouter>);
    
    postEvent.mockImplementation((setEventCreated, setEventData, props, roomId) => setEventCreated(true))

    fireEvent.change(screen.getByLabelText('Start:'), { target: { value: '12:00' } });
    fireEvent.change(screen.getByLabelText('End:'), { target: { value: '14:00' } });
    fireEvent.click(screen.getByText('Add event'));

    expect(screen.getByText('Event created!')).toBeInTheDocument();
    expect(screen.getByText('Link to view:')).toBeInTheDocument();
    expect(screen.getByText('Link to edit:')).toBeInTheDocument();
    expect(screen.getByText('Ok')).toBeInTheDocument();
  });
});

describe('CreateEvent tests', () => {
  test('renders form inputs correctly', () => {
    render(<CreateEvent handleClose={() => { }}>{{ 'day': -1, 'month': -1, 'year': -1 }}</CreateEvent>);
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Description:')).toBeInTheDocument();
    expect(screen.getByLabelText('Link:')).toBeInTheDocument();
    expect(screen.getByLabelText('Start:')).toBeInTheDocument();
    expect(screen.getByLabelText('End:')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Add event')).toBeInTheDocument();
  });

  test('disables Add event button when start is after end', () => {
    render(<CreateEvent handleClose={() => { }}>{{ 'day': -1, 'month': -1, 'year': -1 }}</CreateEvent>);

    fireEvent.change(screen.getByLabelText('Start:'), { target: { value: '14:00' } });
    fireEvent.change(screen.getByLabelText('End:'), { target: { value: '12:00' } });

    expect(screen.getByText('Add event')).toBeDisabled();
  });

  test('calls handleClose when Cancel button is clicked', () => {
    const handleClose = jest.fn();
    render(<CreateEvent handleClose={handleClose}>{{ 'day': -1, 'month': -1, 'year': -1 }}</CreateEvent>);
    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalled();
  });

  test('calls postEvent when Add event button is clicked', () => {
    render(<CreateEvent handleClose={() => { }}>{{ 'day': -1, 'month': -1, 'year': -1 }}</CreateEvent>);

    fireEvent.change(screen.getByLabelText('Start:'), { target: { value: '12:00' } });
    fireEvent.change(screen.getByLabelText('End:'), { target: { value: '14:00' } });

    fireEvent.click(screen.getByText('Add event'));
    expect(postEvent).toHaveBeenCalled();
  });
});

