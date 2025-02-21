import './../../testUtils';

import { TestProviders } from "@/test-utils/MockProviders";
import { render } from "@testing-library/react";
import RankingChart, { RankingChartProps } from './RankingChart';
import Typography from '@mui/material/Typography';

const mockRankingChartData: RankingChartProps = {
    data: [
        { facilityOwner: 'Northland Waterworks Ltd', noOfExceedances: 3 },
        { facilityOwner: 'Eastern Transit Solutions', noOfExceedances: 7 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 5 },
        { facilityOwner: 'Eastern Transit Solutions', noOfExceedances: 2 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 9 },
        { facilityOwner: 'Northland Waterworks Ltd', noOfExceedances: 6 },
        { facilityOwner: 'Southern Logistics Co.', noOfExceedances: 8 },
        { facilityOwner: 'Northland Waterworks Ltd', noOfExceedances: 1 },
        { facilityOwner: 'Southern Logistics Co.', noOfExceedances: 4 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 10 },
        { facilityOwner: 'Eastern Transit Solutions', noOfExceedances: 5 },
        { facilityOwner: 'Southern Logistics Co.', noOfExceedances: 6 },
        { facilityOwner: 'Northland Waterworks Ltd', noOfExceedances: 3 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 7 },
        { facilityOwner: 'Eastern Transit Solutions', noOfExceedances: 8 },
        { facilityOwner: 'Northland Waterworks Ltd', noOfExceedances: 4 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 2 },
        { facilityOwner: 'Eastern Transit Solutions', noOfExceedances: 9 },
        { facilityOwner: 'Southern Logistics Co.', noOfExceedances: 1 },
        { facilityOwner: 'Southern Logistics Co.', noOfExceedances: 5 },
        { facilityOwner: 'Northland Waterworks Ltd', noOfExceedances: 10 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 3 },
        { facilityOwner: 'Western Cargo Group', noOfExceedances: 4 },
        { facilityOwner: 'Pacific Maritime LLC', noOfExceedances: 7 },
        { facilityOwner: 'Green Valley Utilities', noOfExceedances: 2 },
        { facilityOwner: 'Western Cargo Group', noOfExceedances: 5 },
        { facilityOwner: 'Northland Waterworks Ltd', noOfExceedances: 8 },
        { facilityOwner: 'Pacific Maritime LLC', noOfExceedances: 1 },
        { facilityOwner: 'Green Valley Utilities', noOfExceedances: 9 },
        { facilityOwner: 'Western Cargo Group', noOfExceedances: 6 },
        { facilityOwner: 'Pacific Maritime LLC', noOfExceedances: 3 },
        { facilityOwner: 'Green Valley Utilities', noOfExceedances: 10 },
        { facilityOwner: 'Western Cargo Group', noOfExceedances: 2 },
        { facilityOwner: 'Pacific Maritime LLC', noOfExceedances: 5 },
        { facilityOwner: 'Green Valley Utilities', noOfExceedances: 7 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 6 },
        { facilityOwner: 'Southern Logistics Co.', noOfExceedances: 4 },
        { facilityOwner: 'Eastern Transit Solutions', noOfExceedances: 1 },
        { facilityOwner: 'Green Valley Utilities', noOfExceedances: 8 },
        { facilityOwner: 'Western Cargo Group', noOfExceedances: 3 },
        { facilityOwner: 'Pacific Maritime LLC', noOfExceedances: 10 },
        { facilityOwner: 'Northland Waterworks Ltd', noOfExceedances: 9 },
        { facilityOwner: 'Southern Logistics Co.', noOfExceedances: 2 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 7 },
        { facilityOwner: 'Eastern Transit Solutions', noOfExceedances: 6 },
        { facilityOwner: 'Green Valley Utilities', noOfExceedances: 4 },
        { facilityOwner: 'Western Cargo Group', noOfExceedances: 1 },
        { facilityOwner: 'Pacific Maritime LLC', noOfExceedances: 8 },
        { facilityOwner: 'Northland Waterworks Ltd', noOfExceedances: 5 },
        { facilityOwner: 'Southern Logistics Co.', noOfExceedances: 3 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 10 },
        { facilityOwner: 'Green Valley Utilities', noOfExceedances: 9 },
        { facilityOwner: 'Pacific Maritime LLC', noOfExceedances: 6 },
        { facilityOwner: 'Western Cargo Group', noOfExceedances: 2 },
        { facilityOwner: 'Eastern Transit Solutions', noOfExceedances: 4 },
        { facilityOwner: 'Southern Logistics Co.', noOfExceedances: 10 },
        { facilityOwner: 'Central Railways Inc.', noOfExceedances: 8 },
        { facilityOwner: 'Pacific Maritime LLC', noOfExceedances: 9 },
        { facilityOwner: 'Green Valley Utilities', noOfExceedances: 5 },
        { facilityOwner: 'Western Cargo Group', noOfExceedances: 6 },
    ],
    children: <Typography>Hello World</Typography>
};

describe('RankingChart', () => {
    it('should render the chart', () => {
        const { asFragment } = renderRankingChart(mockRankingChartData);
        expect(asFragment()).toMatchSnapshot();
    });
    // it('should display the first cell component as the highest \'exceedant\' child', () => {
    //     const { container } = renderRankingChart(mockRankingChartData);
    //     expect(getByText('Hello World')).toBeInTheDocument();
    //     const firstElement = container.querySelector('');
    //     expect(lineTag).toBeInTheDocument();
    // });
    it('should display its child components', () => {
        const { getByText } = renderRankingChart(mockRankingChartData);
        expect(getByText('Hello World')).toBeInTheDocument();
    });
});

const renderRankingChart = (props: RankingChartProps) => render(
    <TestProviders>
        <RankingChart {...props} />
    </TestProviders>
);
