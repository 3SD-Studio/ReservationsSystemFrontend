import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

describe('Navbar tests', () => {
  test('renders navbar with brand logo', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByText('Reservation system')).toBeInTheDocument();
  });

  test('renders "Rooms" link', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByText('Rooms')).toBeInTheDocument();
  });

  test('renders "Hi, {currentUser}" and "Logout" links when currentUser is provided', () => {
    const currentUser = 'John';
    render(<MemoryRouter><Navbar currentUser={currentUser} /></MemoryRouter>);
    expect(screen.getByText(`Hi, ${currentUser}`)).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('renders "Login" and "Register" links when currentUser is not provided', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});