import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";



//add token to local storage -- 
const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  React.useEffect(()=>{
    if(localStorage.getItem('@token')){
      navigate('/home',{ replace : true});

    }
  })
    
  

  const OnChangeEmail = (event) => {
      setEmail(event.target.value)
  };
  const onChangePassword = (event) => {
      setPassword(event.target.value)
  };

  const handleSubmitting = async() => {
    try{
     Axios.post("http://localhost:3000/admin/login", {
      email : email,
      password : password
  }).then((result)=>{
    localStorage.setItem("@token", result.data.token);
    localStorage.setItem("Nom", result.data.admin.Nom);
    localStorage.setItem("Prenom", result.data.admin.Prenom);

    console.log(localStorage.getItem('@token'));
    navigate('/home',{ replace : true});

  })
    }
    catch(err) {
      console.log(err);
      }
  }
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundColor: '#e0e0e0'
          }}
        >

        <Box
        component="img"
        sx={{
          marginTop : 14,
          marginLeft : 20,
          height: 400,
          width: 450,
      
        }}
        alt="onhym"
        src={process.env.PUBLIC_URL+"images/onhymlogo2.png"}
      />
        <Typography variant="h4" color="initial"
        sx={{
          marginTop : -17,
            marginLeft : 24,
            fontWeight : 500,
            letterSpacing : 1,
            color : '#ff5722'
            
        }}> Suivi De Domaine Minier</Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square 
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop : 18,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <BadgeTwoToneIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Authentification
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {required: 'Email est requise', pattern: {value :/^\S+@\S+$/i , message: 'Format incorrecte'} })}
                onChange={OnChangeEmail}
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
                  {errors.email?.message}
              </Typography>
              

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="MDP"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {required: 'Le mdp est requise'})}

                onChange={onChangePassword}
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
                  {errors.password?.message}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit(handleSubmitting)}
              >
                Se connecter
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}