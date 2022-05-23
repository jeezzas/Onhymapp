import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 470,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};

export default function Logout(props) {
  const navigate= useNavigate();

  const handleDisconnect = () => {
      localStorage.removeItem('Prenom');
      localStorage.removeItem('Nom');
      localStorage.removeItem('@token');
      navigate('/', {replace : true});
  }


  return (
    <div style={{marginTop : 6}}>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container sx={style}>
          <Grid item sm={12}> 
           <Typography id="modal-modal-title" variant="h6" >
          Etes-vous sûr de vouloir vous déconnecter ?
          </Typography>
          </Grid>
          <Grid item sm={12}> 
          <ButtonGroup sx={{ marginTop : 3, marginLeft : 11.5}}>
            <Button onClick={props.handleClose} variant="outlined" color="primary"> Retour</Button>
            <Button onClick={handleDisconnect} variant="contained"  color="error"> Déconnecter</Button>
          </ButtonGroup>
          </Grid>
       </Grid>
      </Modal>
    </div>
  );
}