const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  
  user: {
    type: Object
  },
  data: {
    type: Array,
    default: []
  },
  product: {
    type: Array,
    default: []
  }
  
})

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;