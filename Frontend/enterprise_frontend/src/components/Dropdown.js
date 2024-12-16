import React, { useState } from 'react';
import profile from './profile.png'
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Dropdown = ({ onSignOut }) => {
    const [anchorEl, setAnchorEl] = useState(null);
 
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
 
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const username = localStorage.getItem("name")
 
    return (
        <div>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="antiquewhite"
                sx={{width:50,height:40,color:"white"}}
            >
                <img src={profile} alt="Logo" style={{width:60,height:33}} />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleMenuClose}>Welcome,{username}!</MenuItem>

                <MenuItem onClick={() => { handleMenuClose(); onSignOut(); }}>Sign Out</MenuItem>
            </Menu>
        </div>
    );
};
 
export default Dropdown;