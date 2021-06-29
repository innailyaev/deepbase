const express = require('express');
const router = express.Router();
const cohortModel = require('../models/cohort.model');

console.log("routeeeeeeeeeeeeeee");

router.post('/', async (req,res)=>{ 
    const userData = req.body;
    const cohort = new cohortModel(userData);

    try{ 
        await cohort.save();
        res.send("success");
    }catch (e){
        res.send(e);
    }

})
module.exports = router;
