const { RechargeModel, AllTransactionModel } = require('../model/model');
const mongoose = require('mongoose');

const submitRef  = async(req,res,next)=>{
    if(mongoose.isValidObjectId(req.body.payId)){
        const rechargeData = await RechargeModel.findOne({_id:req.body.payId});
        if(rechargeData){ 
            const updateData = await RechargeModel.updateOne({_id:req.body.payId},{UTR:req.body.UTR,paymentStatus:1});
            res.json({message:'success'});
        }else{
            res.json({message:'DATA_NOT_EXIST'});
        }
    }else{
        res.json({message:'DATA_NOT_EXIST'});
    }
}

module.exports = {submitRef};