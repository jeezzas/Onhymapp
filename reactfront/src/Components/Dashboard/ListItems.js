import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Divider from '@mui/material/Divider';

import Logout from '../Logout';
import { useNavigate } from 'react-router-dom';





export default function MainListItems(){
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpenL = () => setOpen(true);
  const handleCloseL = () => setOpen(false);
return(
  <React.Fragment>
    <ListItemButton onClick={()=>navigate('/home')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/addDomaine')}>
      <ListItemIcon>
        <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Ajouter domaine" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/allDomaines')}>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Liste domaines" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Rapports" />
    </ListItemButton>
    <Divider variant="middle" />
            <ListItemButton onClick={handleOpenL}>
            <ListItemIcon>
            <LogoutIcon color='error'/> 
             </ListItemIcon >
            <ListItemText primary="Disconnect" sx={{ color : 'danger'}}/>
            </ListItemButton>
            <Logout open={open} handleClose={handleCloseL}/>

  </React.Fragment>
);
}
