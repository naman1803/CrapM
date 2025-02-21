import './testUtils';

import { TestProviders } from '@/test-utils/MockProviders';
import { render } from '@testing-library/react';
import DashBoard, { DashboardProps } from './DashBoard';
import { Typography } from '@mui/material';
import ResizeObserver from 'resize-observer-polyfill';

// resizeobserver is not defined
beforeAll(() => {
    globalThis.ResizeObserver = ResizeObserver;
});

const mockDashBoardData: DashboardProps = {
    title: 'Analytics',
    dashBoardStyles: undefined,
    children: <Typography>Hello World</Typography>
}

// resizeobserver is not defined
beforeAll(() => {
    globalThis.ResizeObserver = class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

describe('Dashboard', () => {
    it('should render the Dashboard', () => {
        const { asFragment } = renderDashboard(mockDashBoardData);
        expect(asFragment()).toMatchSnapshot();
    });
    it('should display the Dashboard title', () => {
        const { getByText } = renderDashboard(mockDashBoardData);
        expect(getByText('Analytics')).toBeInTheDocument();
    });
    it('should display its child components', () => {
        const { getByText } = renderDashboard(mockDashBoardData);
        expect(getByText('Hello World')).toBeInTheDocument();
    });
});

const renderDashboard = (props: DashboardProps) => render(
    <TestProviders>
        <DashBoard {...props} />
    </TestProviders>
);
