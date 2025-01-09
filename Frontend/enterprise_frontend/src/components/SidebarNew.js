import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link, useNavigate} from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import GroupIcon from '@mui/icons-material/Group';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';



export default function SidebarNew() {
    const navigate = useNavigate();
    const logout =()=>{
      Cookies.remove('Token');
      navigate('/');
    }
    const mystyle = {
        color: "white",
        fontSize: '1.5rem',
      };

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {[
            {text:'Home',icon:<DashboardIcon></DashboardIcon>},
            {text:'Projects',icon:<ManageSearchIcon></ManageSearchIcon>},
            {text:'Employees',icon:<StorageIcon></StorageIcon>},
            {text:'Users',icon:<GroupIcon></GroupIcon>}
          ].map((item, index) => (
            <ListItem key={item.text} component={Link} to={`/${item.text.toLowerCase()}`} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div>
        <Divider />
        <List>
          {[
            {text:'Sign Out',icon:<LogoutIcon></LogoutIcon>}
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton  component={Link} to="/" onClick={logout} >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </div>
      </Box>
    );

  return (
    <div>
      <button onClick={toggleDrawer(true)} className="text-white focus:ring-4 focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" style={mystyle}>
      &#9776;</button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
