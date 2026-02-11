import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton } from '@mui/material';
import { Menu as MenuIcon, LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';

interface NavbarProps {
  currentSection: string;
  onMenuClick: () => void;
  onSectionClick: (section: string) => void;
  menuItems: string[];
  onThemeToggle?: () => void;
  mode?: 'light' | 'dark';
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentSection, 
  onMenuClick, 
  onSectionClick,
  menuItems 
  , onThemeToggle, mode
}) => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: 'background.paper', color: 'text.primary', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            RC
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {menuItems.map((item) => (
            <Button
              key={item}
              color="inherit"
              onClick={() => onSectionClick(item)}
              sx={{
                textTransform: 'capitalize',
                fontWeight: currentSection === item ? 700 : 400,
                borderBottom: currentSection === item ? '2px solid #fff' : 'none'
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
        <Box sx={{ ml: 2 }}>
          <IconButton color="inherit" onClick={onThemeToggle} aria-label="toggle theme">
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
