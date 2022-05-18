import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Moment from 'react-moment';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Axios from 'axios';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItem, Modal } from '@mui/material';
import Button from '@mui/material/Button';










const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function AllDomaines() {

    const [domaines, setDomaines] = useState([]);
    const [currentDomaine, setCurrentDomaine] = useState(null);
    const [geoList, SetGeoList] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = (domaine) => {
      setCurrentDomaine(domaine);
      setOpen(true);
      console.log(domaine)
    }
    const handleClose = () => {setOpen(false);
      setCurrentDomaine(null)}

      const handleClick = () => {
        SetGeoList(!geoList);
      };

    useEffect(()=>{   
      try{
        Axios.get('http://localhost:3000/domaineMin/',
        {
        }).then((response)=>{
          
          setDomaines(response.data);
          console.log(domaines);
        });
      } catch(err){
        console.log(err);
      }
      },[]
    )

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow >
            <TableCell  />
            <TableCell>Numero Domaine</TableCell>
            <TableCell >Type</TableCell>
            <TableCell >Condition</TableCell>
            <TableCell >Etat</TableCell>
            <TableCell >date d'Institution</TableCell>
            <TableCell >date d'Echeance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {domaines.map(domaine=>{
              return(
              <TableRow key={domaine._id} hover onClick={()=>handleOpen(domaine)}>
                  <TableCell/>
                  <TableCell>{domaine.nDomaine}</TableCell>
                  <TableCell >{domaine.typeDm}</TableCell>
                  <TableCell >{domaine.conditionDm}</TableCell>
                  <TableCell >{domaine.etatDm}</TableCell>
                  <TableCell ><Moment format="DD/MM/YYYY">{domaine.dateInstitu}</Moment></TableCell>
                  <TableCell ><Moment format="DD/MM/YYYY">{domaine.dateEcheance}</Moment></TableCell>
              </TableRow>
              )
              
            })}
        </TableBody>
      </Table>
    </TableContainer>
                {currentDomaine && <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                    <List

                      sx={style}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={     
                        <ListSubheader component="div" id="nested-list-subheader">
                          Domaine  : {currentDomaine.nDomaine}
                        </ListSubheader>
                      }
                      >
                        <ListItem>                      
                            <Typography  color="body1">Type : </Typography>
                           <Typography  color="body2  " ml={1}>{currentDomaine.typeDm}</Typography> 
                        </ListItem>
                        <ListItem>                      
                            <Typography  color="body1">Condition : </Typography>
                           <Typography  color="body2  " ml={1}>{currentDomaine.conditionDm}</Typography> 
                        </ListItem>
                        <ListItem>                      
                            <Typography  color="body1" > Etat : </Typography>
                           <Typography  color="body2  "  ml={1}>{currentDomaine.geologue[0].nMat}</Typography> 
                        </ListItem>
                        <ListItem>                      
                            <Typography  color="body1">Date d'Institution : </Typography>
                           <Typography  color="body2  " ml={1}><Moment format="DD/MM/YYYY">{currentDomaine.dateInstitu}</Moment></Typography> 
                        </ListItem>
                        <ListItem>                      
                            <Typography  color="body1">Date d'Echeance : </Typography>
                           <Typography  color="body2  " ml={1}><Moment format="DD/MM/YYYY">{currentDomaine.dateEcheance}</Moment></Typography> 
                        </ListItem>
                      
                     

                      <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Geologue" />
                        {geoList ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={geoList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding  ml={20  }>
                            <ListItem>                      
                            <ListItemText primary="Carte Topographique" />
                           </ListItem>
                        </List>
                      </Collapse>
                    </List>
                </Modal>
                }
     </>
  );
}