import { render } from '@testing-library/react';
import SeverityDot, { SeverityDotProps } from './SeverityDot';

describe('SeverityDot', () => {
    const defaultProps: SeverityDotProps = {
        cx: 50,
        cy: 50,
        severityLevel: 'Low',
    };

    it('renders correctly with severity level "Low"', () => {
        const { asFragment } = render(<SeverityDot {...defaultProps} severityLevel="Low" />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders correctly with severity level "Moderate"', () => {
        const { asFragment } = render(<SeverityDot {...defaultProps} severityLevel="Moderate" />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders correctly with severity level "High"', () => {
        const { asFragment } = render(<SeverityDot {...defaultProps} severityLevel="High" />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders correctly with severity level "Critical"', () => {
        const { asFragment } = render(<SeverityDot {...defaultProps} severityLevel="Critical" />);
        expect(asFragment()).toMatchSnapshot();
    });
});
