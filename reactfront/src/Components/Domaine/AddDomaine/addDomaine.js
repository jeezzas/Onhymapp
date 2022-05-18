import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Axios from 'axios';

const theme = createTheme();

const types = [
  {
    id : 1,
    value : 'Permis de recherche'
  },
  {
    id : 2,
    value : 'Licence d exploitation'
  },    
] 
const etats = [
  {
    id : 1,
    value : 'Institution'
  },
  {
    id : 2,
    value : 'Renouvlé'
  },
] 
const conditions = [
  {
    id : 1,
    value : 'Domaine Propre'
  },
  {
    id : 2,
    value : 'En Convention'
  },
] 

const entites = [
  {
    id : 1,
    value : 'Metaux precieux'
  },
  {
    id : 2,
    value : 'Metaux de base'
  },
  {
    id : 3,
    value : 'Roches et mineraux'
  }
]



export default function addDomaine() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [nDomaine, setNdomaine] = useState('');
  const [typeDm, setTypeDm] = useState('');
  const [etatDm, setEtatDm] = useState('');
  const [conditionDm, setConditionDm] = useState('');
  const [dateInstitu, setDateInstitu] = useState(null);
  const [dateEcheance, setDateEcheance] = useState(null);
  const [coordonneeX, setCoordonneeX] = useState('');
  const [coordonneeY, setCoordonneeY] = useState('');
  const [carteTopo, setCarteTopo] = useState('');
  const [entiteAdm, setEntiteAdm] = useState(null);
  const [geologue, setGeologue] = useState('');
  const [substance, setSubstance] = useState([]);
  const [geos, setGeos] = useState([]);
  // const [subs, setSubs] = useState([]);

  useEffect(()=>{
    if(entiteAdm){
    try{
      Axios.post('http://localhost:3000/geologue/findbyentite',
      { nomEntite : entiteAdm}
    ).then((response)=>{
        
        setGeos(response.data);
        console.log(response.data);
      });
    } catch(err){
      console.log(err);
    }
  }
    },[entiteAdm]
  )



  const handleNDomaine=(e)=>{
    setNdomaine(e.target.value);
  }
  const handleTypeDm=(e)=>{
    setTypeDm(e.target.value);
}

  const handleEtatDm=(e)=>{
    setEtatDm(e.target.value);
  }

  const handleConditionDm=(e)=>{
    setConditionDm(e.target.value);
  }

  const handleCarteTopo=(e)=>{
    setCarteTopo(e.target.value);
  }
  const handleCoordX=(e)=>{
    setCoordonneeX(e.target.value);
  }
  const handleCoordY=(e)=>{
    setCoordonneeY(e.target.value);
  }
  const handleEntiteAdm=(e)=>{

    setEntiteAdm(e.target.value);
  }
  const handleGeologue=(e)=>{

        setGeologue(e.target.value)
  };

  // const handleSubstance=(e)=>{
  //   const {
  //     target: { value },
  //   } = e;
  //   setSubstance(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };




  const handleSubmitting= data =>{
    console.log(data);
    console.log(errors);
      
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h4">
            Ajouter un domaine minier
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitting)} sx={{ mt: 3 }}>

              
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                  name="Numero domaine"
                  fullWidth
                  id="Ndomaine"
                  label="Numero du domaine"
                  value={nDomaine}
                  {...register("nDomaine", {required: 'Numero du domaine est requise'})}
                  onChange={handleNDomaine}
                  autoFocus
                />
                  <Typography variant="caption" 
              gutterBottom  
              sx= {{
                  color : 'red',
                  fontWeight : 'bold',
                  letterSpacing : 1
              }}
              
              >
                  {errors.nDomaine?.message}
              </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="typeDm">Type</InputLabel>
                  <Select
                    labelId="typeDmLabel"
                    id="typeDm"
                    value={typeDm}
                    label="Age"
                     {...register("typeDm", {required: 'Type du domaine est requise'})}
                    onChange={handleTypeDm}
                   
                  >
                    {types.map((type)=>{
                      return( <MenuItem key={type.id}value={type.value}>{type.value}</MenuItem>)
                        
                    })}
                   
                  </Select>
                </FormControl>
                <Typography variant="caption" 
              gutterBottom  
              sx= {{
                  color : 'red',
                  fontWeight : 'bold',
                  letterSpacing : 1
              }}
              >
                  {errors.typeDm?.message}
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="etatDmLabel">Etat</InputLabel>
                  <Select
                    labelId="etatDmLabel"
                    id="etatDm"
                    value={etatDm}
                    label="Age"   
                    {...register("etatDm", {required: 'Etat du domaine est requise'})}
                    onChange={handleEtatDm}
                  >
                    {etats.map((etat)=>{
                      return( <MenuItem key={etat.id}value={etat.value}>{etat.value}</MenuItem>)
                        
                    })}
                   
                  </Select>
                </FormControl>
                <Typography variant="caption" 
              gutterBottom  
              sx= {{
                  color : 'red',
                  fontWeight : 'bold',
                  letterSpacing : 1
              }}
              ml={0.2}
              >
                  {errors.etatDm?.message}
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="conditionDmLabel">Condition</InputLabel>
                  <Select
                    labelId="conditionDmLabel"
                    id="conditionDm"
                    value={conditionDm}
                    label="Condition"
                    {...register("conditionDm", {required: 'Condition du domaine est requise'})}
                    onChange={handleConditionDm}
                  >
                    {conditions.map((condition)=>{
                      return( <MenuItem key={condition.id}value={condition.value}>{condition.value}</MenuItem>)
                        
                    })}
                   
                  </Select>
                </FormControl>
                <Typography variant="caption" 
              gutterBottom  
              sx= {{
                  color : 'red',
                  fontWeight : 'bold',
                  letterSpacing : 1
              }}
              ml={0.2}
              >
                  {errors.conditionDm?.message}
              </Typography>
              </Grid>
            
              <Grid item xs={6} sm={6} >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                id="dateInstitu"
                value={dateInstitu}
                label="Date Institution"
                inputFormat="dd/MM/yyyy"
                renderInput={(params) => <TextField {...params}  fullWidth {...register("dateInstitu", {required: 'Date Institution du domaine est requise'})}/>}
                onChange={(newValue) => {
                  setDateInstitu(newValue);
                }}
              
              />
             </LocalizationProvider>
             <Typography variant="caption" 
              gutterBottom  
              sx= {{
                  color : 'red',
                  fontWeight : 'bold',
                  letterSpacing : 1
              }}
              ml={0.2}
              >
                  {errors.dateInstitu?.message}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  id="dateEcheance"
                  value={dateEcheance}
                  label="Date Echeance"
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => <TextField {...params} fullWidth  {...register("dateEcheance", {required: 'Date Echeance du domaine est requise'})} />}
                  onChange={(newValue) => {
                    setDateEcheance(newValue);
                  }}
                />
               </LocalizationProvider>
                  <Typography variant="caption" 
                  gutterBottom  
                  sx= {{
                      color : 'red',
                      fontWeight : 'bold',
                      letterSpacing : 1
                  }}
                  ml={0.2}
                  >
                      {errors.dateEcheance?.message}
                  </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  name="Carte Topographique"
                  fullWidth
                  id="carteTopo"
                  label="Carte Topographique"
                  value={carteTopo}
                  {...register("carteTopo", {required: 'Carte Topographique est requise'})}
                  onChange={handleCarteTopo}
                  autoFocus
                />
               <Typography variant="caption" 
                  gutterBottom  
                  sx= {{
                      color : 'red',
                      fontWeight : 'bold',
                      letterSpacing : 1
                  }}
                  ml={0.2}
                  >
                      {errors.carteTopo?.message}
                  </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
              <TextField
                  name="Coordonnee X"
                  fullWidth
                  id="coordonneeX"
                  label="Coordonnee X"
                  value={coordonneeX}
                  {...register("coordonneeX", {required: 'Coordonnee X est requise'})}
                  onChange={handleCoordX}
                  autoFocus
                />
                  <Typography variant="caption" 
                  gutterBottom  
                  sx= {{
                      color : 'red',
                      fontWeight : 'bold',
                      letterSpacing : 1
                  }}
                  ml={0.2}
                  >
                      {errors.coordonneeX?.message || errors.coordonneeY?.message}
                  </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
              <TextField
                  name="Coordonnee Y"
                  fullWidth
                  id="coordonneeY"
                  label="Coordonnee Y"
                  value={coordonneeY}
                  {...register("coordonneeY", {required: 'Coordonnee Y est requise'})}
                  onChange={handleCoordY}
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12} sm={12}>
                <FormControl>
                  <FormLabel id="entite">Entite Administrative</FormLabel>
                  <RadioGroup
                  row
                    aria-labelledby="entite"
                    name="entites"
                    value={entiteAdm}
                 
                    {...register("entiteAdm", {required: 'Entite Adoministrative est requise'})}
                    onChange={handleEntiteAdm}
                  > 
                  {entites.map((entite)=>{
                    return(<FormControlLabel key={entite.id} value={entite.value} control={<Radio />} label={entite.value}/>)
                      
                  })}
                  </RadioGroup>
                </FormControl>
                <Typography variant="caption"  
                      
                    sx= {{
                        color : 'red',
                        fontWeight : 'bold',
                        letterSpacing : 1
                    }}
                    ml={-40}

                    >
                  {errors.entiteAdm?.message}
              </Typography>
              </Grid>
              
              {entiteAdm &&  
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="geologueLabel">Geologue</InputLabel>
                  <Select
                     labelId="geologueLabel"
                    id="geologue"
                    defaultValue=''
                    value={geologue}
                    
                    label="Condition"
                    {...register("geologue")}
                    onChange={(e)=>{
                      handleGeologue(e)}}
                  >
                    {geos.map(g=>(<MenuItem key={g._id} value={g.nMat}>{g.nMat}</MenuItem>))}
                  </Select>
                </FormControl>
                <Typography variant="caption" 
              gutterBottom  
              sx= {{
                  color : 'red',
                  fontWeight : 'bold',
                  letterSpacing : 1
              }}
              ml={0.2}
              >
                  {errors.geologue?.message}
              </Typography>
              </Grid>
              }
               {/* {entiteAdm &&  
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="conditionDmLabel">Substance</InputLabel>
                  <Select
                    labelId="conditionDmLabel"
                    id="conditionDm"
                    value={substance}
                    defaultValue=""
                    label="Substance"
                    {...register("Substance")}
                    onChange={handleSubstance}
                  >
                    {subs.map((s)=>{
                      ( <MenuItem key={s._id}value={s.nom}>{s.nom}</MenuItem>)
                        
                    })}
                   
                  </Select>
                </FormControl>
                <Typography variant="caption" 
              gutterBottom  
              sx= {{
                  color : 'red',
                  fontWeight : 'bold',
                  letterSpacing : 1
              }}
              ml={0.2}
              >
                  {errors.Substance?.message}
              </Typography>
              </Grid>
              } */}

              <Grid container spacing={2} ml={81}>
                      <Grid item>
                        <Button                       
                        variant="outined"                        
                        sx={{ mt: 2, mb: 2 }}
                      >
                        Retour
                      </Button>
                      </Grid>
                      <Grid item>
                        <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                      >
                        Ajouter
                      </Button>
                    </Grid>
            </Grid>
            </Grid>  
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}