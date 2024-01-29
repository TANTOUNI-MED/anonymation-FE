/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';

import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';



const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({
    color: theme.palette.background.default,
  }),

  zIndex: 99,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: HEADER_MOBILE,
  borderRadius: 16,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// eslint-disable-next-line react/prop-types
export default function Searchbar({ onDataReceived }) {
  const [name, setName] = useState('');
  const [, setOpen] = useState(false);



  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search?name=${name}`);
      const data = await response.json();

      // Notify the parent component (AppView) with the received data
      onDataReceived(data);

      // Handle the data as needed
      console.log('Search Results:', data);
    } catch (error) {
      console.error('Error searching:', error);
    }

    handleClose();
  };

  

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Slide direction="down" in mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              value={name}
              onChange={(e) => setName(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>


       

        
            

      </div>
    </ClickAwayListener>
  );
}
