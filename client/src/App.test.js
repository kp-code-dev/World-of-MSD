import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders World of MSD logo', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const logoElement = screen.getByAltText(/World of MSD Logo/i);
  expect(logoElement).toBeInTheDocument();
});
