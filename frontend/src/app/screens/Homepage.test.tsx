import { render, screen } from '@testing-library/react';
import Homepage from './Homepage';

test('Render in Product Pitch on Homepage', async () => {
  render(<Homepage />);
  const header = screen.getByText('Crap Map');
  expect(header).toBeInTheDocument();
});
