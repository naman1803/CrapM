import './../../testUtils';

import { TestProviders } from "@/test-utils/MockProviders";
import { render } from "@testing-library/react";
import ChartFrame, { ChartFrameProps } from "./ChartFrame";
import { Typography } from "@mui/material";

const mockChartFrame: ChartFrameProps = {
    size: 'half',
    children: <Typography>Hello World</Typography>
};

describe('ChartFrame', () => {
    it('should render the chart', () => {
        const { asFragment } = renderChartFrame(mockChartFrame);
        expect(asFragment()).toMatchSnapshot();
    });
    it('should display its child components', () => {
        const { getByText } = renderChartFrame(mockChartFrame);
        expect(getByText('Hello World')).toBeInTheDocument();
    });
});

const renderChartFrame = (props: ChartFrameProps) => render(
    <TestProviders>
        <ChartFrame {...props} />
    </TestProviders>
);
