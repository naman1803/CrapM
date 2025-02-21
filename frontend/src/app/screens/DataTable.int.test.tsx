import '@/test-utils/reactLeafletMock';

import { TestProviders } from '@/test-utils/MockProviders';
import AppRoutes from '../routes';
import LocationDisplay from '@/test-utils/LocationDisplay';
import { render, waitFor } from '@testing-library/react';

describe('DataTable', () => {
  it('renders the data table loading', () => {
    const { getByText } = renderViewPage('/datatable');
    expect(getByText('Sewage Data Overview')).toBeInTheDocument();
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  it('renders the data table with the data', async () => {
    const { getByText, asFragment } = renderViewPage('/datatable');
    expect(getByText('Sewage Data Overview')).toBeInTheDocument();
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('Facility Owner')).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });
});

const renderViewPage = (initialRoute: string) =>
  render(
    <TestProviders initialRoute={initialRoute}>
      <AppRoutes />
      <LocationDisplay />
    </TestProviders>,
  );
