import './../../testUtils';

import { TestProviders } from "@/test-utils/MockProviders";
import { render } from "@testing-library/react";
import SeverityBarChart, { SeverityBarProps } from './SeverityBarChart';

const mockSeverityBarChartData: SeverityBarProps = {
    data: [
        { facilityOwner: 'Carmeuse Lime (Canada) Limited - Beachville Operation', severityLevel: 'Low', severityScore: 0.8 },
        { facilityOwner: 'Colacem Canada Inc.  -L\'Orignal Quarry', severityLevel: 'Low', severityScore: 0.6 },
        { facilityOwner: 'CRH Canada Group Inc.ñ Mississauga Plant', severityLevel: 'Moderate', severityScore: 1.15 },
        { facilityOwner: 'Forterra Brick, Ltd. / Briques Forterra, Ltee - Niagara Quarry', severityLevel: 'High', severityScore: 2 },
        { facilityOwner: 'CrapMap Industries', severityLevel: 'Critical', severityScore: 3 },
        { facilityOwner: 'Harte Gold Corp. - Sugar Zone Project', severityLevel: 'Moderate', severityScore: 1.5 },
    ]
};

describe('SeverityBarChart', () => {
    it('should render the chart', () => {
        const { asFragment } = renderSeverityBarChart(mockSeverityBarChartData);
        expect(asFragment()).toMatchSnapshot();
    });
});

const renderSeverityBarChart = (props: SeverityBarProps) => render(
    <TestProviders>
        <SeverityBarChart {...props} />
    </TestProviders>
);
