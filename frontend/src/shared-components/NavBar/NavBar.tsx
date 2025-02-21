import { AppBar, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export interface NavItemPage {
  name: string;
  route: string;
}
interface NavbarProps {
  pages: NavItemPage[];
}

const Navbar: React.FC<NavbarProps> = ({ pages }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: "#000000",
        backgroundImage: `url(../../../public/assets/fireNav.gif)`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'auto 30%',
        backgroundPosition: 'bottom',
        height: '4.5rem',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            padding: 0,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <img
            src={"../../../public/assets/sick_icon.png"}
            alt="site logo"
            style={{
              height: '80%',
              maxHeight: '40px'
            }}
          />
          <img
            src={"../../../public/assets/home_logo.gif"}
            alt="site title"
            style={{
              height: '80%',
              maxHeight: '40px',
              paddingTop: '5px'
            }}
          />
        </IconButton>
        {pages.map((page) => (
          <MenuItem key={page.name} onClick={() => navigate(page.route)} sx={{ marginLeft: "1rem" }}>
            <Typography>{page.name.toUpperCase()}</Typography>
          </MenuItem>
        ))}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
