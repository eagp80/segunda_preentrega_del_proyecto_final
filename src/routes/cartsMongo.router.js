import { Router } from "express";
import cartsMongoModel  from "../dao/models/cartsMongo.models.js";
import CartMongoManager from "../dao/managers/cartMongo.manager.js";
import { Schema, model, Types } from "mongoose";
const { ObjectId } = Types;



class CartsMongoRoutes {
    //path="/courses";
  path = "/cartsmongo";
  router = Router();
  cartMongoManager = new CartMongoManager();

  constructor() {
    this.initCartsMongoRoutes();
  }

  initCartsMongoRoutes() {
    this.router.post(`${this.path}`, async (req, res) => {
      try {
        // TODO: HACER VALIDACIONES DEL BODY
        const myObjectId = new ObjectId('000000000000000000000000').toString();
        console.log(myObjectId);

        // const cartMongo = new cartsMongoModel({
        //   products : 
        //   [{product: myObjectId,
        //   quantity:0}]         
        // });

        const cartMongo = {"products": [{"product": myObjectId, "quantity":0 }]};
        console.log("cartMongo es:");
        console.log(cartMongo);

        // TODO REVISANDO SI EL ESTUDIANTE YA FUE CREADO ANTERIOMENTE
        const newCartMongo = await this.cartMongoManager.createCartMongo(cartMongo);
        if (!newCartMongo) {
          return res.json({
            message: `the cartMongo not created`,
          });
        }//se cambio por throw,

        return res.status(201).json({
          message: `cart created successfully in Mongo Atlas`,
          cart: newCartMongo,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: cartsMongo.router.js:32 ~ CartsMongoRoutes ~ this.router.post ~ error:",
          error
        );
        //recibe tambiem el catch de createProductMongo
         return res.status(400).json({
            message: error.message ?? error            
          });
        }
    });

    //this.router.get(`${this.path}/:courseId`, async (req, res) => {
    this.router.get(`${this.path}/:cartMongoId`, async (req, res) => {
      try {
        // TODO: HACER VALIDACIONES *
        const cartMongoId=req.params.cartMongoId;
        let cartMongoData = await this.cartMongoManager.getCartMongoById(cartMongoId);
        
        // TODO REVISANDO SI EL CARRITO YA FUE CREADO ANTERIOMENTE
        
        if (!cartMongoData) {
          return res.json({
            message: `the cart by Id in Mongo Atlas not found`,
          });
        }//se cambio por throw,

        return res.status(201).json({
          message: `cart found successfully in Mongo Atlas`,
          cart: cartMongoData,
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: cartsMongo.routes.js:48 ~ CartsMongoRoutes ~ this.router.get ~ error:",
          error
        );
        //recibe tambiem el catch de getCartById ProductMongo
         return res.status(400).json({
            message: error.message ?? error            
          });
        }
    });
    //*************************************************************************************
    //*************************************************************************************
    //*************************************************************************************
    // Agregar un Id de  producto a un carrito por medio de Id
    //*************************************************************************************
    //*************************************************************************************
    //*************************************************************************************

    this.router.post(`${this.path}/:cartMongoId/product/:productMongoId`, async (req, res) => {
      // return res.json({ message: `cartsMongo POST no implementado aun` });
      try {
        // TODO: HACER VALIDACIONES 
        const cartMongoId=req.params.cartMongoId;
        const productMongoId=req.params.productMongoId;
        let cartMongoData = {};

        cartMongoData = await this.cartMongoManager.getCartMongoById(cartMongoId);
        // console.log("cartMongoData tomado de base de datos mongo atlas:");
        // console.log(cartMongoData);
        // TODO REVISANDO SI EL CARRITO YA FUE CREADO ANTERIOMENTE
        
        if (!cartMongoData) {// 1. si no existe carrito no se hace nada
          return res.json({
            message: `the cart by Id in Mongo Atlas not found`,
          });
        }//se cambio por throw,

        //***** 2. si producto es el Id="000000000000000000000000" reemplazarlo */
        if(cartMongoData.products[0].product==new ObjectId("000000000000000000000000").toString()){
            //cartMongoData.cart.products.push( productMongoId);
            //console.log("verificado con exito Id 0000");
            //console.log(cartMongoId);
            //AAAAAAAAAAAA
            // console.log(cartMongoData.products[0].quantity+1);
            const productNewId= new ObjectId(productMongoId);
            console.log("entro en 2");


            cartsMongoModel.findByIdAndUpdate(cartMongoId, { products: [{product: productNewId, quantity:cartMongoData.products[0].quantity+1}] }, { new: true })
            .then(updatedCart => {//lo que devuelve lo muestro en consola
              console.log(updatedCart);
            })
            .catch(error => {
              console.error("error Efren1",error);
            });

        } else {// fin if 2, else al if 2... Situacion 3. si el carrito existe, tiene Id distinto de "000000000000000000000000" verificar si ya tiene el producto
            console.log("verificando antes de entrar a 3 o 4")
            const idComp = new ObjectId(productMongoId);
            var existeProduct = false;
            var indexOfProducts= 0;
            cartMongoData.products.forEach((element,i) => {
            // console.log(element.product);
            // console.log(idComp);
            // console.log(i);

              if(element.product.toString() === idComp.toString()){//este if solo funciono con toString() en ambos
                // console.log("entro al ifffffff");
                existeProduct= true;
                indexOfProducts=i;              
              }
              
            });
            // console.log("fuera del foreahc");
            // console.log(existeProduct);
            // console.log(cartMongoData.products[indexOfProducts].product)
            // console.log(new ObjectId(productMongoId))

            if(existeProduct==true){//if 3 situacion 3
                  cartMongoData.products[indexOfProducts].quantity++;
                  console.log("entrooooo en 3")         

                  cartsMongoModel.findByIdAndUpdate(cartMongoId, {products: cartMongoData.products }, { new: true })
                  .then(updatedCart => {
                  console.log("Carrito actualizado");
                  console.log(updatedCart);
                  })
                  .catch(error => {
                  console.error("error Efren3",error);
                  });           
            
            } else {//else a if 3,  situacion 4 . si el carrrito existe y no tiene el producto ***********TRABAJAR ESTO*********************
                  console.log("entrooooo en 4")

                  const productNewId= new ObjectId(productMongoId);
                  cartMongoData.products.push({ product:productNewId, quantity: 1 }); 
                  cartsMongoModel.findByIdAndUpdate(cartMongoId, {products: cartMongoData.products }, { new: true })
                  .then(updatedCart => {
                  console.log(updatedCart);
                  })
                  .catch(error => {
                  console.error("error Efren4",error);
                  });               
              //jjjjjjjj
            }// fin else de situacion 4
        }//fin else del if 2, situacion 3
        return res.status(201).json({
          //agregar 
          message: `cart found successfully and update in Mongo Atlas`
        
        });
      } catch (error) {
        console.log(
          "🚀 ~ file: cartsMongo.routes.js:140 ~ CartsMongoRoutes ~ this.router.get ~ error:",
          error
        );
        //recibe tambiem el catch de getCartById ProductMongo
         return res.status(400).json({
            message: error.message ?? error            
          });
        }
    });

    this.router.put(`${this.path}/:cartsMongoId`, async (req, res) => {
      return res.json({ message: `cartsMongo PUT no implementado aun` });
    });

    this.router.delete(`${this.path}/:cartsMongoId`, async (req, res) => {
      return res.json({ message: `cartsMongo DELETE no implementado aun` });
    });
  }
}

export default CartsMongoRoutes;
