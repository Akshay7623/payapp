const express = require("express");
const getPayDetails = express.Router();
const getPayDetailsController = require("../controller/getpaydetails.controller.js");

const {isNull, isUndefined} = require('./DataVerification.js');
  const verifyData = (req, res, next) => {
    if(isNull(req.body.payId) || isUndefined(req.body.payId) || req.body.payId.length !=24){
        res.json({message:'INVALID_DATA'});
        return;
    }else{
        next();
    }
}

getPayDetails.post("/", verifyData, getPayDetailsController.getDetails);
module.exports = getPayDetails;