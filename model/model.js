const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  mobile: Number,
  loginPassword: String,
  withdrawPassword: String,
  time:Number,
  inviteCode:String,
  ReferCode:String,
  otp:Number,
  wallet:{
    type:Number,
    default:0
  },
  bonusWallet:{
    type:Number,
    default:0
  },
  isV:{
    type:Number,
    default:0
  },
  OtpTried:{
    type:Number,
    default:0
  },
  bonusWallet1:{
    type:Number,
    default:0
  },
  bonusWallet2:{
    type:Number,
    default:0
  },
  totalPeople1:{
    type:Number,
    default:0
  },
  totalPeople2:{
    type:Number,
    default:0
  },
  bonusDone:{
    type:Number,
    default:0
  },
  currentPeriod:{
    type:Number,
    default:9978
  },
  parity:{
    type:Array,
    default:[0,0,0,0,0,0,0,0,0,0,0,0,100]
  },
  sapre:{
    type:Array,
    default:[0,0,0,0,0,0,0,0,0,0,0,0,0]
  },
  bcone:{
    type:Array,
    default:[0,0,0,0,0,0,0,0,0,0,0,0,0]
  },
  emerd:{
    type:Array,
    default:[0,0,0,0,0,0,0,0,0,0,0,0,0]
  }

});

const RechargeSchema = new mongoose.Schema({
  userId:String,
  UTR:{
    type:String,
    default:''
  },
  name:String,
  email:String,
  upi:String,
  mobile:Number,
  time:Number,
  paymentStatus:{
    type:Number,
    default:0
  },
  rechargeAmount:Number
});

const WithdrawSchema = new mongoose.Schema({
  userId:String,
  name:String,
  email:String,
  mobile:Number,
  source:String,
  ifsc:{
    type:String,
    default:'0'
   },
  bankName:String,
  time:Number,
  paymentStatus:{
    type:Number,
    default:0
  },
  withdrawAmount:Number
});

const AllTransactionSchema = new mongoose.Schema({
  userId:String,
  type:String,
  time:Number,
  transactionStatus:Number,
  amount:Number
});


const RegisterModel = new mongoose.model('users',RegisterSchema);
const RechargeModel = new mongoose.model('recharges',RechargeSchema);
const AllTransactionModel = new mongoose.model('alltransactions',AllTransactionSchema);
const WithdrawModel = new mongoose.model('withdraws',WithdrawSchema);


module.exports = {RegisterModel, RechargeModel, AllTransactionModel,WithdrawModel};