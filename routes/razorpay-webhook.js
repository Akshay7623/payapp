const express = require("express");
const RazorpayWeb = express.Router();
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
const {RegisterModel, AllTransactionModel,WithdrawModel} = require('../model/model');

const RazorpayWebhook = async(req,res,next)=>{
    const webhookBody = req.body;
    const webhookSignature = req.headers["x-razorpay-signature"];
    
        if (typeof webhookSignature === 'undefined' || typeof req.body === 'undefined') {
          res.json({ success: false });
          return;
        }
        if (req.body.toString().trim() === '' || webhookSignature.toString().trim() === '') {
          res.json({ success: false });
          return;
        }
    
    if (validateWebhookSignature(JSON.stringify(webhookBody), webhookSignature, process.env.RAZORPAY_SECRET)){  

    const {transactionId,transactionDataId,withdrawAmount,userId} = webhookBody.payload.payout.entity.notes;
    const {transactionStatus} = await AllTransactionModel.findOne({_id:transactionDataId});

      if(webhookBody.event === 'payout.processed'){

        const updateTransactionId = await WithdrawModel.updateOne({_id:transactionId},{paymentStatus:1});
        const updateTransactionDataId = await AllTransactionModel.updateOne({_id:transactionDataId},{transactionStatus:1});
 
      }else if(webhookBody.event === 'payout.reversed'){

        if(transactionStatus === 0){
          const updateTransactionId = await WithdrawModel.updateOne({_id:transactionId},{paymentStatus:2});
          const updateTransactionDataId = await AllTransactionModel.updateOne({_id:transactionDataId},{transactionStatus:2});
          const updateWallet = await RegisterModel.updateOne({_id:userId},{$inc:{wallet:withdrawAmount}});
        }

      }else if(webhookBody.event === 'payout.failed'){

        if(transactionStatus === 0){
          const updateTransactionId = await WithdrawModel.updateOne({_id:transactionId},{paymentStatus:2});
          const updateTransactionDataId = await AllTransactionModel.updateOne({_id:transactionDataId},{transactionStatus:2});
          const updateWallet = await RegisterModel.updateOne({_id:userId},{$inc:{wallet:withdrawAmount}});
        }

      }else if(webhookBody.event === 'payout.rejected'){

        if(transactionStatus === 0){
          const updateTransactionId = await WithdrawModel.updateOne({_id:transactionId},{paymentStatus:2});
          const updateTransactionDataId = await AllTransactionModel.updateOne({_id:transactionDataId},{transactionStatus:2});
          const updateWallet = await RegisterModel.updateOne({_id:userId},{$inc:{wallet:withdrawAmount}});
        }
      }
    }
        res.json({message:'success'});
  }


RazorpayWeb.post("/", RazorpayWebhook);
module.exports = RazorpayWeb;