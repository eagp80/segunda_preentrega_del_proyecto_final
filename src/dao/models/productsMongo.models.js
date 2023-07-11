import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2"

const productMongoCollection = "products"; //en otra parte se pone en minusculas y mongo le agrega una "s"
//toco cambiar "Product" por "products" para que me hiciera population

const productsMongoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true, 
    unique:true, 
    index: true,
        
  },  
  price: {
    type: String,
    required: true,
  },
  status:{
    type: Boolean,
    required: true,
    default: true,
  },
  stock: {
    type: String,
    required: true,
    default: "true",
  },
  category: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: String,
    required: true,
  },
    
});

productsMongoSchema.plugin(mongoosePaginate);

const productMongoModel = mongoose.model(productMongoCollection, productsMongoSchema);//contiene seudonimo collection y esquema
export default productMongoModel;