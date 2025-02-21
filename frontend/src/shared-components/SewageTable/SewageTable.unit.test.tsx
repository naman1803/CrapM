import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SewageTable, { SewageTableProps } from './SewageTable';
import { SewageData } from '@/types/SewageData';
const mockSewageData: SewageData[] = [
  {
    id: 1,
    facilityOwner: 'Facility 1',
    siteAddress: 'Address 1',
    contaminant: 'Contaminant 1',
    typeOfExceedance: 'Exceedance 1',
    exceedanceStartDate: '2024-01-01T00:00:00Z',
    exceedanceEndDate: '2024-01-02T00:00:00Z',
    contaminantLimit: 5,
    contaminantUnit: 'mg/L',
    limitFrequency: 'Daily',
    noOfExceedances: 2,
    quantityMaximum: 10,
    quantityMinimum: 1,
  },
];

describe('SewageTable', () => {
  it('should render the table', () => {
    const { asFragment } = renderSewageTable({
      sewageData: mockSewageData,
      isLoading: false,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render empty table when no data is available', () => {
    const { queryAllByText } = renderSewageTable({
      sewageData: [],
      isLoading: false,
    });
    expect(queryAllByText(/Facility/)).toHaveLength(1);
  });

  it('should display loading message when loading', () => {
    const { getByText } = renderSewageTable({
      sewageData: [],
      isLoading: true,
    });
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});

const renderSewageTable = (props: SewageTableProps) =>
  render(<SewageTable {...props} />);
