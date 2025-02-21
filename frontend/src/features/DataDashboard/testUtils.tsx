jest.mock('recharts', () => ({
  __esModule: true,
  ...jest.requireActual('recharts'),
  ResponsiveContainer: jest.fn().mockImplementation(({ children }) => (
    <div>
      <p>ResponsiveContainer</p>
      {children}
    </div>
  )),
}));
