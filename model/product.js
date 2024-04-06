const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  description: String,
  price : Number,
  discountPercentage : Number,
  rating : Number,
  brand: String,
  category : String,
  images : [String]
});

exports.product =  mongoose.model('Product', productSchema);