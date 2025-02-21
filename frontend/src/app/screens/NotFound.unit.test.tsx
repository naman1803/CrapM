import { render } from '@testing-library/react';
import NotFound from './NotFound';

test('Render in Product Pitch on Homepage', async () => {
  const { getByText } = renderHomepage();
  const header = getByText('404 Not Found');
  expect(header).toBeInTheDocument();
});
const renderHomepage = () => {
  return render(<NotFound />);
};
