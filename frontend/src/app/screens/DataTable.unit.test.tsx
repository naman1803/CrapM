import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from './DataTable';

test('renders the page', async () => {
  render(<DataTable />);
  const header = screen.getByText('Industrial Sewage Data Overview');
  expect(header).toBeInTheDocument();
});
