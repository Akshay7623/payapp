require('dotenv').config();
require('./config.js');
const express  = require('express');
const cors = require('cors');
const path = require('path');
const getPayDetailsRoute = require('./routes/getPayDetailsRoute.js');
const submitPayDetailsRoute = require('./routes/submitPayDetailsRoute.js');
const RazorpayWebhook = require('./routes/razorpay-webhook.js');

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/getdetails',getPayDetailsRoute);
app.use('/api/submitpay',submitPayDetailsRoute);
app.use('/api/razorpay-webhook',RazorpayWebhook);

app.use(express.static(__dirname + '/build'));
app.get("/*", (req, res) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
});