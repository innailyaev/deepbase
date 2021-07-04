const mongoose = require ('mongoose');

const cohortSchema = mongoose.Schema ({
    city: {
    type: String, 
     },
    country_name: {
    type: String,  
    },
    country_code: {
    type: String,
    },
    appCodeName: {
    type: String,
    },
    appName: {
            type: String,
    },
    appVersion: {
            type: String,
    },
    cookieEnabled: {
            type: String,
    },
    language: {
            type: String,
    },
    onLine: {
            type: String,
    },
    platform: {
            type: String,
    },
    product: {
        type: String,
    },
    userAgent: {
        type: String,
    },
    screenHeight: {
        type: String,
    },
    screenWidth: {
        type: String,
    },
    screenHeight: {
        type: String,
    },
    screenPixelDepth: {
        type: String,
    },
    ip:{
        type:String,
    },
    secondsSinceEpoch:{
        type: String,
    }
});

cohortSchema.set('collection','cohort');

const Cohort = mongoose.model ('cohort', cohortSchema);
module.exports = Cohort;
