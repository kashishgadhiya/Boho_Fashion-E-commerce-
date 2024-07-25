const Razorpay = require('razorpay');
razorpay_apikey = "rzp_test_CC8QM4gS2H2TsZ",
razorpay_secretkey = "Fo4wKudPgnBp3DAjA0rIeR4y"
 export const  razorpay = new Razorpay({
  key_id: razorpay_apikey,
  key_secret: razorpay_secretkey,
});