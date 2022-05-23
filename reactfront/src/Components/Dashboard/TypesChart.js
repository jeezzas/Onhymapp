import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Axios from 'axios';
import { useState, useEffect } from 'react';


export default function TypesChart(){
    const [domaines, setDomaines] = useState([]);
    var PermisRecherches = [];
    var LicenceExploitations = [];


    const pr=(array)=>{
        const newArray = []
        array.forEach(element => {
            if(element.typeDm=='Permis de recherche'){
                newArray.push(element);
            }
        });
        return newArray;    
    }
    const le=(array)=>{
        const newArray = []
        array.forEach(element => {
            if(element.typeDm=='Licence d exploitation'){
                newArray.push(element);
            }
        });
        return newArray;    
    }


 
    PermisRecherches= pr(domaines);
    LicenceExploitations = le(domaines);
    

    useEffect(()=>{   
        try{
          Axios.get('http://localhost:3000/domaineMin/'
          ).then((response)=>{
            console.log(response.data)
            setDomaines(response.data);
          });
        } catch(err){
          console.log(err);
        }
        },[]
      )

    // const Data= domaines.map(d=>(
    //         {
    //             nDomaine : d.nDomaine,
    //             typeDm : d.typeDm

    //         }
    // ))
    const Data =  {
        npr : PermisRecherches.length,
        nle : LicenceExploitations.length,
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
                                                
            <BarChart width={1000} height={250} data={Data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey='type' />
            <YAxis/>
            <Tooltip />
            <Legend />
            <Bar dataKey="npr" data fill="#8884d8" />
            <Bar dataKey="nle" fill="#8884d8" />

            </BarChart>
       
      </ResponsiveContainer>
    );
  }

