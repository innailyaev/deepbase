const express = require('express');
const router = express.Router();
const cohortModel = require('../models/cohort.model');

console.log("routeeeeeeeeeeeeeee");

router.post('/', async (req,res)=>{ 
    const userData = req.body;
    console.log("routeeeeeeeeeeeeeee",userData);

    // {
    //     city, 
    //     country_name,
    //     country_code,
    //     appCodeName,
    //     appCodeName,
    //     appVersion,
    //     cookieEnabled,
    //     language,
    //     onLine,
    //     platform,
    //     product,
    //     userAgent,
    //     screenHeight,
    //     screenWidth,
    //     screenPixelDepth  
    // }
    const cohort = new cohortModel(userData);

    try{ 
        await cohort.save();
        res.send("success");
    }catch (e){
        res.send(e);
    }

})
module.exports = router;
