const express = require("express");
const submitPayDetails = express.Router();
const submitPayDetailsController = require("../controller/submitpaydetails.controller.js");

const {isNull, isUndefined} = require('./DataVerification.js');

  const verifyData = (req, res, next) => {

    if(isNull(req.body.UTR) || isUndefined(req.body.UTR) || req.body.UTR.length !=12 || isNull(req.body.payId) || isUndefined(req.body.payId) || req.body.payId.length !=24){
        res.json({message:'INVALID_DATA'});
        return;
    }else{
        next();
    }

}

submitPayDetails.post("/", verifyData, submitPayDetailsController.submitRef);
module.exports = submitPayDetails;