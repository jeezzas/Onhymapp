const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Substance = require("../models/substance")
const Entite = require("../models/entite_administrative");


//POST Entite
router.post('/', (req,res, next)=>{
    const substance = new Substance({
        _id : new mongoose.Types.ObjectId(),
        nom : req.body.nom,
        entite : req.body.entite
    });
    substance.save().
    then(result=>{
        console.log(result)
        console.log(req.body)
    }).
    catch(err=>console.log(err));
    res.status(201).json({
        message: 'POST  Request to /substance',
        createdSub : substance
    });
})

//get subs by ID
router.get("/find", async(req, res, next) => {
    const nom = req.body.nomEntite;
    const entiteId= await Entite.findOne({nomEntite : nom}, "_id");

    Substance.find({ entite : entiteId},"nom")
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
