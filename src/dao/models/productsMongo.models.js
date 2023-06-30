import mongoose from 'mongoose';

const productMongoCollection = "Product"; //en otra parte se pone en minusculas y mongo le agrega una "s"

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
        
  },  
  price: {
    type: String,
    required: true,
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

const productMongoModel = mongoose.model(productMongoCollection, productsMongoSchema);//contiene seudonimo collection y esquema
export default productMongoModel;