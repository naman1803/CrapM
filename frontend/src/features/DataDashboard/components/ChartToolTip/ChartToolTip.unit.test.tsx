import './../../testUtils';

import { TestProviders } from "@/test-utils/MockProviders";
import { render } from "@testing-library/react";
import ChartToolTip, { ChartToolTipProps } from './ChartToolTip';

const mockChartToolTipData: ChartToolTipProps = {
    payload: [
        {
            payload: {
                SeverityScore: 1,
                SillyScore: 2,
                FunScore: 3,
            },
        },
    ],
    labels: {
        SeverityScore: 'Severity Score',
        SillyScore: 'Silly Score',
        FunScore: 'Fun Score',
    },
};

describe('ChartToolTip', () => {
    it('should render the tool tip', () => {
        const { asFragment } = renderChartToolTip(mockChartToolTipData);
        expect(asFragment()).toMatchSnapshot();
    });
});

const renderChartToolTip = (props: ChartToolTipProps) => render(
    <TestProviders>
        <ChartToolTip {...props} />
    </TestProviders>
);
