import './../../testUtils';

import { TestProviders } from "@/test-utils/MockProviders";
import SeverityOverTimeChart, { SeverityOverTimeProps } from "./SeverityOverTimeChart";
import { render } from "@testing-library/react";

export interface Contaminants {
    [key: string]: {
        averageSeverityScore: number;
        overallSeverityLevel: string;
        averagePercentExceedance: number;
        records: ContaminantRecord[];
    };
}

interface ContaminantRecord {
    date: string;
    severityScore: number;
    severityLevel: string;
}

const mockSeverityOverTimeData: SeverityOverTimeProps = {
    data: {
        'Metrolinx - GO Transit Halton Hills': {
            overallSeverityLevel: "Moderate",
            averagePercentExceedance: 3,
            averageSeverityScore: 2.85,
            records: [
                { severityLevel: 'Low', severityScore: 0.91, date: '2016-02-05' },
                { severityLevel: 'Moderate', severityScore: 3.22, date: '2016-02-17' },
                { severityLevel: 'Moderate', severityScore: 1.07, date: '2016-05-12' },
                { severityLevel: 'Low', severityScore: 0.67, date: '2016-05-15' },
                { severityLevel: 'Critical', severityScore: 5.01, date: '2016-06-15' },
                { severityLevel: 'High', severityScore: 3.92, date: '2016-08-02' },
                { severityLevel: 'Low', severityScore: 0.67, date: '2016-09-05' },
                { severityLevel: 'Low', severityScore: 0.57, date: '2016-10-21' },
                { severityLevel: 'Low', severityScore: 0.45, date: '2016-10-31' },
                { severityLevel: 'Low', severityScore: 0.15, date: '2016-11-07' },
            ]
        }
    }
};

describe('SeverityOverTimeChart', () => {
    it('should render the chart', () => {
        const { asFragment } = renderSeverityOverTimeChart(mockSeverityOverTimeData);
        expect(asFragment()).toMatchSnapshot();
    });
    it('should display at least one line segment on the chart', () => {
        const { container } = renderSeverityOverTimeChart(mockSeverityOverTimeData);
        const lineTag = container.querySelector('line');
        expect(lineTag).toBeInTheDocument();
    });
});

const renderSeverityOverTimeChart = (props: SeverityOverTimeProps) => render(
    <TestProviders>
        <SeverityOverTimeChart {...props} />
    </TestProviders>
);
