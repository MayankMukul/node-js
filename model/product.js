const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {type:String, required : true}, // String is shorthand for {type: String}
  description: {type:String, required : true},
  price : {type:Number,min : [0, "Wrong Price"], required : true},
  discountPercentage : {type:Number, min : [0, "Wrong Discount"], max : [50, "Wrong Max Discount"]},
  rating : {type:Number, min : [0, "Wrong  Rating"], max : [5], default: 0 },
  brand: {type:String, required : true},
  category : {type:String, required : true},
  thumbnail: {type : String , required : true},
  images : [String],
});

exports.Product =  mongoose.model('Product', productSchema);