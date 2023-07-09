import { Router } from "express";
import CartsMongoManager from "../dao/managers/cartMongo.manager.js";
import ProductsMongoManager from "../dao/managers/productMongo.manager.js";
import productMongoModel from "../dao/models/productsMongo.models.js";


class ViewsMongoRoutes {
  path = "/viewsmongo";
  router = Router();
  productMongoManager = new ProductsMongoManager();
  cartsMongoManager = new CartsMongoManager();

  constructor() {
    this.initViewsMongoRoutes();
  }

  initViewsMongoRoutes() {
    this.router.get(`${this.path}/productsmongo`, async (req, res) => {
      // let students = [
      //   { name: "prueba", lastName: "apellidoPrueba", dni: "12345678" },
      // ];
      const productsMongo = await this.productMongoManager.getAllProductsMongo();
      const mappedProductsMongo = productsMongo.map((p) => {
        return {
          title: p.title,
          price: p.price,
        };
      });
      res.render("productsMongo", { productsMongo: mappedProductsMongo });
    });

    this.router.get(`${this.path}/cartsmongo`, async (req, res) => {
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
      res.render("cartsMongo", { cartsMongo: cartsMongoMapped });
    });

    this.router.get(`${this.path}/productsmongopage`, async (req, res) => {
      const {page=1} = req.query;
      const {docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage }=
       await productMongoModel.paginate({}, {limit:2, page, lean:true});
       const aux = 
       await productMongoModel.paginate({}, {limit:2, page, lean:true});
       console.log(aux);

      res.render("productsMongoPage",{
        payload: docs,
        totalPages:totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page:page,
        hasPrevPage:hasPrevPage,
        hasNextPage:hasNextPage,
        //prevLink: Link directo a la página previa (null si hasPrevPage=false),
        //nextLink:Link directo a la página siguiente (null si hasNextPage=false),
      })
    })
  }
}

export default ViewsMongoRoutes;
