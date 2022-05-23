import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button'
import Logout from './Logout';

import { useNavigate } from "react-router-dom";


export default function NavBar  () {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpenL = () => setOpen(true);
  const handleCloseL = () => setOpen(false);

  const today = new Date();
 


  const navigate = useNavigate();


  return (
    <Box sx={{ flexGrow: 1 }} mb={3}>
      
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <MenuItem  onClick={()=>navigate('/home', { replace : false})}>
                  <Typography textAlign="center">Dashboard</Typography>
            </MenuItem>
        
          <Typography variant="p"  sx={{ flexGrow: 1 }} align ='right'>
            Administrateur : {localStorage.getItem('Nom')} {localStorage.getItem('Prenom')}
          </Typography>
            
              
                <Button onClick={handleOpenL}  variant="filled" color="error" size='small'> Déconnecter</Button>
                <Logout open={open} handleClose={handleCloseL}/>
           
        </Toolbar>
      </AppBar>
    </Box>
  );
}
