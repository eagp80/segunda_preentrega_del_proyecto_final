import { Router } from "express";
import CartsMongoManager from "../dao/managers/cartMongo.manager.js";
import ProductsMongoManager from "../dao/managers/productMongo.manager.js";

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
      const cartsMongo = await this.cartsMongoManager.getAllCartsMongo();
      const cartsMongoMapped = cartsMongo.map((cartMongo) => {
        return {
          products: cartMongo.products,
        };
      });
      res.render("cartsMongo", { cartsMongo: cartsMongoMapped });
    });
  }
}

export default ViewsMongoRoutes;
