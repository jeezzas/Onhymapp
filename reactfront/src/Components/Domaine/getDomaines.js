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
import {  ListItem, Modal } from '@mui/material';
import Button from '@mui/material/Button';
import Navbar from '../NavBar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';









const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function AllDomaines() {

    const [domaines, setDomaines] = useState([]);
    const [geologueList, setGeologueList] = useState([]);
    const [substanceList, setSubstanceList] = useState([]);
    const [currentDomaine, setCurrentDomaine] = useState(null);
    const [geoItems, SetGeoItems] = useState(false);
    const [subItems, SetSubItems] = useState(false);

    const [open, setOpen] = useState(false);

    const handleOpen = (domaine) => {
      setCurrentDomaine(domaine);
      SetGeoItems(false);
      SetSubItems(false);

      setOpen(true);
      console.log(domaine)
    }
    const handleClose = () => {
      setOpen(false);
      setCurrentDomaine(null)}



      const handleClickGeo = async(ids) => {
        try{
          await Axios.post('http://localhost:3000/geologue/findManyGeos', {
            ids : ids
        }).then((response)=>{
              setGeologueList(response.data);
              console.log(response.data)
          })
        }
        catch(err){
          console.log(err)
        }
        SetGeoItems(!geoItems);      
      };

     
      
      const handleClickSub = async(ids) => {
        try{
          await Axios.post('http://localhost:3000/substance/findManySubs', {
            ids : ids
        }).then((response)=>{
              setSubstanceList(response.data);
              console.log(response.data)
          })
        }
        catch(err){
          console.log(err)
        }
        SetSubItems(!subItems);     
       };

     

  
    useEffect(()=>{   
      try{
        Axios.get('http://localhost:3000/domaineMin/'
        ).then((response)=>{
          
          setDomaines(response.data);
        });
      } catch(err){
        console.log(err);
      }
      },[]
    )


  return ( 
    <>
    <CssBaseline />
    <Navbar/> 
    <Container component="main" maxWidth="lg">
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    <Typography component="h1" variant="h4" mb={3}>
            Liste des domaines miniers
          </Typography>
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
                           <Typography  color="body2  "  ml={1}>{currentDomaine.etatDm}</Typography> 
                        </ListItem>
                        <ListItem>                      
                            <Typography  color="body1">Date d'Institution : </Typography>
                           <Typography  color="body2  " ml={1}><Moment format="DD/MM/YYYY">{currentDomaine.dateInstitu}</Moment></Typography> 
                        </ListItem>
                        <ListItem>                      
                            <Typography  color="body1">Date d'Echeance : </Typography>
                           <Typography  color="body2  " ml={1}><Moment format="DD/MM/YYYY">{currentDomaine.dateEcheance}</Moment></Typography> 
                        </ListItem>
                        <ListItem>                      
                            <Typography  color="body1">Carte Topographique : </Typography>
                           <Typography  color="body2  " ml={1}>{currentDomaine.carteTopo}</Typography> 
                        </ListItem>
                        <ListItem>                      
                            <Typography  color="body1">Coordonnées : </Typography>             
                            <Typography  color="body2" ml={1}>X = "{currentDomaine.coordonnees.coordinates[0]}" ,</Typography> 
                            <Typography  color="body2" ml={1}>Y ="{currentDomaine.coordonnees.coordinates[1]}" </Typography> 
                        </ListItem>
                      <ListItemButton onClick={()=>handleClickGeo(currentDomaine.geologue)}>
                        <ListItemText primary="Geologue" />
                        {geoItems ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={geoItems} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding  ml={20 }>
                        {geologueList.map(g=>( 
                           <ListItem key={g._id} >                      
                            <Typography  color="body1">{g.nMat} </Typography>
                           </ListItem>))}
                          
                        </List>
                      </Collapse>
                      <ListItemButton onClick={()=>handleClickSub(currentDomaine.substance)}>
                        <ListItemText primary="Substance" />
                        {subItems ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={subItems} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding  ml={20 }>
                        {substanceList.map(s=>( 
                           <ListItem key={s._id} >                      
                            <Typography  color="body1">{s.nom} </Typography>
                           </ListItem>))}
                          
                        </List>
                      </Collapse>
                    </List>
                </Modal>
      
                }
          </Box>
      </Container>
      </> 
  );
}