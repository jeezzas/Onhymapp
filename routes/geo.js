const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Geologue = require("../models/geologue");
const Entite = require("../models/entite_administrative");



//POST Entite
router.post('/', (req,res, next)=>{
    const geologue = new Geologue({
        _id : new mongoose.Types.ObjectId(),
        nMat : req.body.nMat, 
        nom : req.body.nom,
        prenom : req.body.prenom,
        email : req.body.email,
        entite : req.body.entite,
    });
    geologue.save().
    then(result=>{
        console.log(result)
        console.log(req.body)
    }).
    catch(err=>console.log(err));
    res.status(201).json({
        message: 'POST  Request to /domain_min',
        createdGeo : geologue
    });
})

//get Geo by ID
router.post("/find", async(req, res, next) => {
    const nom = req.body.nomEntite;
    const entiteId= await Entite.findOne({nomEntite : nom}, "_id");

    Geologue.find({ entite : entiteId},"nMat")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });



module.exports = router;
