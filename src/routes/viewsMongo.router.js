import { Router } from "express";
import CartsMongoManager from "../dao/managers/cartMongo.manager.js";
import ProductsMongoManager from "../dao/managers/productMongo.manager.js";
import productMongoModel from "../dao/models/productsMongo.models.js";
import { NODE_ENV, PORT, API_VERSION, CURSO } from "../config/config.js";



class ViewsMongoRoutes {
  path = "/views";
  router = Router();
  productMongoManager = new ProductsMongoManager();
  cartsMongoManager = new CartsMongoManager();

  constructor() {
    this.initViewsMongoRoutes();
  }

  initViewsMongoRoutes() {

    //esto se usaba en una implementacion anterior, una vista simple
    // this.router.get(`${this.path}/productsmongo2`, async (req, res) => {
    //   // let students = [
    //   //   { name: "prueba", lastName: "apellidoPrueba", dni: "12345678" },
    //   // ];
    //   const productsMongo = await this.productMongoManager.getAllProductsMongo();
    //   const mappedProductsMongo = productsMongo.map((p) => {
    //     return {
    //       title: p.title,
    //       price: p.price,
    //     };
    //   });
    //   res.render("productsMongo2", { productsMongo: mappedProductsMongo });
    // });

    this.router.get(`${this.path}/carts`, async (req, res) => {
      // let courses = [];
      let i = 0;
      const cartsMongo = await this.cartsMongoManager.getAllCartsMongoPopulate();

      const cartsMongoMapped = cartsMongo.map((cartMongo, index) => {
        return {
          i: index+1,
          // products: cartMongo.products.map(prod => prod.product.title)

          products: cartMongo.products.map(prod => {
            return {
              title: prod.product.title,
              qty: prod.quantity
            }
          })

        }
      })
      console.log(JSON.stringify(cartsMongoMapped));    
      cartsMongoMapped.map(item =>  console.log("Carrito:",item.i,item.products));     
      res.render("carts", { cartsMongo: cartsMongoMapped });
    });


   //******************************************************************************* */
   //******************************************************************************* */
   //*******************Vista de productos con paginacion*************************** */
   //******************************************************************************* */
   //******************************************************************************* */
    this.router.get(`${this.path}/products`, async (req, res) => {
      const {page=1, limit=10, query, sort} = req.query;
      
      let q = {};
      let qString ="";
      if(query){
       q= JSON.parse(query);
       qString = JSON.stringify(q);
      }
      let s = {};
      if(sort){
       s= JSON.parse(sort);       
      }      
      const {docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage }=
       await productMongoModel.paginate(q, {limit, page, sort:s, lean:true});
       
      //  const aux = 
      //  await productMongoModel.paginate(q, {limit, page, sort:s, lean:true});
      //  console.log(aux); //esto era para ver que llegaba de mongo atlas.

       let qStringURI = encodeURIComponent(qString);
    
      let url1 =`http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${qStringURI}`
      let url2 =`http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${qStringURI}`

      res.render("products",{
        payload: docs,
        totalPages:totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page:page,
        hasPrevPage:hasPrevPage,
        hasNextPage:hasNextPage,
        prevLink: hasPrevPage
        ? url1
        : null,
      nextLink: hasNextPage
        ? url2
        : null,
        //prevLink: Link directo a la página previa (null si hasPrevPage=false),
        //nextLink:Link directo a la página siguiente (null si hasNextPage=false),
      })
    })
  }
}

export default ViewsMongoRoutes;
