const {RechargeModel} = require('../model/model');
const mongoose = require('mongoose');

const getDetails = async(req,res,next)=>{
    
  if(mongoose.isValidObjectId(req.body.payId)){
    const userRecharge = await RechargeModel.findOne({_id:req.body.payId});
    if(userRecharge){
       res.json({data:userRecharge});
   }else{
       res.json({message:'invalid'});
   }
  }else{
    res.json({message:'invalid'});
  }
  
}

module.exports = {getDetails};