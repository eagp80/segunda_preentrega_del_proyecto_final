
 
# PRIMEROS PASOS DE UN ECOMERCE.
##  SERVIDOR DE PRODUCTOS Y CARRITOS CON EXPRESS Y WEBSOCKET SOCKETS.IO, VISTAS HANDLEBARS, BASE DE DATOS CON MONGO ATLAS (JUNTO A FILE SYSTEM) Y CHAT.
### CORRESPODE A ENTREGABLE 5 CLASE 15.
...

## Consigna. Se está requiriendo lo siguiente:

Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:

## Aspectos a incluir

- Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto. 

- Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones “carts”, “messages”, “products” y sus respectivos schemas.

- Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta “dao”. Dentro de dao, agregar también una carpeta “models” donde vivirán los esquemas de MongoDB. La estructura deberá ser igual a la vista en la clase 15, integradora.

- Contener todos los Managers (FileSystem y DB) en una carpeta llamada “Dao”.

- Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem.

- NO ELIMINAR FileSystem de tu proyecto.

- Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita implementar un chat como el visto en clase. Los mensajes deberán guardarse en una colección “messages” en mongo (no es necesario implementarlo en FileSystem). El formato es:  {user:correoDelUsuario, message: mensaje del usuario}.

- Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.


### Sugerencias

- Te recomendamos que, para este entregable, repitas las pruebas realizadas en la pre-entrega de la clase 8.n


## Formato del entregable

- Link al repositorio de Github, el cual debe contar con todo el proyecto.
- NO INCLUIR LOS node_modules generados.

## *PROCESO DE TESTING*

- 1

- 2

## Rutas para servidor con file-system en puerto 8081:

- Carritos:
    - /api/carts/:cid   GET_BY_CID  trae carrito cid en formato JSON.
    - /api/carts/   POST crea un carrito nuevo vacío.
    - /api/carts/:cid/product/:pid  POST agregar producto pid a carrito cid.
    - En api/carts/  No hay PUT ni DELETE.

- Productos:
    - /api/products/:pid GET_BY_PID muestra carrito pid en formato JSON, PUT con postman body y params, DELETE con postman y params.
    - /api/products/ GET de todos los productos en formato JSON y no hay formulario, POST con postman y body.
    - /api/products?limit=NUM GET muestra los primeros NUM productos en formato JSON. Utiliza req.query.

    - Adicionalmente, en localhost:8081/index2.html se tiene un formulario html para hacer POST de product.

- Socket IO:
    - /    GET    Tiene socket. Utiliza vista "home.handlebars" y muestra lista de todos los productos en html. No tiene formulario.
    - /realtimeproducts  GET   Tiene socket. Utiliza vista "realTimeProducts.handlebars" y Tiene formulario para hacer post de product, muestra Lista de productos, al crear un producto nuevo lo muestra resaltado en una tabla y agrega al final de la lista mostrada el nuevo producto en html.

## Rutas para servidor con Mongo-Atlas en puerto 8000:

# Rutas carritos con Mongo:

-  /api/v1/cartsmongo  GET
-  /api/v1/cartsmongo/:cartsMongoId  GET DELETE
-  /api/v1/cartsmongo/  POST
-  /api/v1/cartsmongo/:cartsMongoId  PUT

# Rutas productos con Mongo:

-  /api/v1/productsmongo/insertion GET
-  /api/v1/productsmongo GET POST
-  /api/v1/productsmongo/:productMongoId GET