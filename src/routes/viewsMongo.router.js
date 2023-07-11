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
      try {
        const { page = 1, limit = 10, query, sort } = req.query;
        let q = {};
        let qString = "";       
        let s = {};
        let sString = "";
        let url1="";
        let url2="";


        if (sort) {
          s = JSON.parse(sort);
          sString= JSON.stringify(s);
        }        
        if(query){
          q = JSON.parse(query);
          qString = JSON.stringify(q);
        }
        const { docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
          await productMongoModel.paginate(q, { limit, page, sort: s, lean: true });      

          if (!query && sort) {            
            url1=`http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${prevPage}&sort=${sString}`;
            url2=`http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${nextPage}&sort=${sString}`;
          }

          
          if (query && !sort) {
            let qStringURI = encodeURIComponent(qString);
            url1=`http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${prevPage}&query=${qStringURI}`;
            url2=`http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${nextPage}&query=${qStringURI}`;
          }

          if (!query && !sort) {
            url1=`http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${prevPage}`;
            url2=`http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${nextPage}`;
          }        

          if (query && sort) {
            let qStringURI = encodeURIComponent(qString);
            url1 = `http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${qStringURI}`
            url2 = `http://localhost:${PORT}/api/${API_VERSION}/views/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${qStringURI}`
        }
        //  const aux = 
        //  await productMongoModel.paginate(q, {limit, page, sort:s, lean:true});
        //  console.log(aux); //esto era para ver que llegaba de mongo atlas.
        
        docs.forEach(element => {//algunos documentos no tienen el status:true
          if (element.status === false) {
            element.status = "false"
          } else {
            element.status = "true"
          }
          //console.log("element.status");//para verificar si a los status:undefined se pasaban a true
          //console.log(element.status);

        });
        //console.log("docs");//para verificar si a docs se le colocaba status: true
        //console.log(docs);


        res.render("products", {
          payload: docs,
          totalPages: totalPages,
          prevPage: prevPage,
          nextPage: nextPage,
          page: page,
          hasPrevPage: hasPrevPage,
          hasNextPage: hasNextPage,
          prevLink: hasPrevPage
            ? url1
            : null,
          nextLink: hasNextPage
            ? url2
            : null,
          //prevLink: Link directo a la página previa (null si hasPrevPage=false),
          //nextLink:Link directo a la página siguiente (null si hasNextPage=false),
        })
      } catch (error) {
        console.log(
          "🚀 ~ file: viewsMongo.router.js:106 ~ viewsMongoRoutes ~ this.router.put ~ error:",
          error
        );
      }
      

 
    })
  }
}

export default ViewsMongoRoutes;
