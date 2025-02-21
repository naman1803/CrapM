import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Navbar, { NavItemPage } from './NavBar';
import { TestProviders } from '../../test-utils/MockProviders';

const renderNavbar = (props: any) => {
  return render(
    <TestProviders>
      <Navbar {...props} />
      <p>{window.location.pathname}</p>
    </TestProviders>,
  );
};

describe('Navbar', () => {
  const pages: NavItemPage[] = [
    { name: 'Home', route: '/' },
    { name: 'About', route: '/about' },
    { name: 'Contact', route: '/contact' },
  ];

  it('renders all navigation items', () => {
    const { getByText } = renderNavbar({ pages });

    pages.forEach((page) => {
      expect(getByText(page.name)).toBeInTheDocument();
    });
  });

  it.each(pages)('navigates to %s on click', async ({ name }) => {
    const { getByText } = renderNavbar({ pages });
    const menuItem = getByText(name);
    expect(menuItem).toBeInTheDocument();

    act(() => {
      fireEvent.click(menuItem);
    });
    expect(getByText(window.location.pathname)).toBeInTheDocument();
  });
});
