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

    this.router.get(`${this.path}/products`, async (req, res) => {
      const {page=1, limit=10, query, sort} = req.query;
      
      let q = {};
      if(query){
       q= JSON.parse(query);
      }
      let s = {};
      if(sort){
       s= JSON.parse(sort);       
      }
      // console.log(query);
      //console.log(q);
      //ejemplo: http://localhost:8000/api/v1/views/productsmongopage?query={%22title%22:%22Producto%2026%22}
      const {docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage }=
       await productMongoModel.paginate(q, {limit, page, sort:s, lean:true});
      //  const aux = 
      //  await productMongoModel.paginate(q, {limit, page, sort:s, lean:true});
      //  console.log(aux); //esto era para ver que llegaba de mongo atlas.

      res.render("products",{
        payload: docs,
        totalPages:totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page:page,
        hasPrevPage:hasPrevPage,
        hasNextPage:hasNextPage,
        prevLink: hasPrevPage
        ? `http://localhost:${PORT}/api/${API_VERSION}/products?limit=${limit}&page=${prevPage}`
        : null,
      nextLink: hasNextPage
        ? `http://localhost:${PORT}/api/${API_VERSION}/products?limit=${limit}&page=${nextPage}`
        : null,
        //prevLink: Link directo a la página previa (null si hasPrevPage=false),
        //nextLink:Link directo a la página siguiente (null si hasNextPage=false),
      })
    })
  }
}

export default ViewsMongoRoutes;
