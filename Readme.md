
 ### Escribir a mi whatsapp para explicar el funcionamiento porque le he realizado varias modificaciones y son dos servidores en uno:whatsapp +573158680076.
# PROFESIONALIZACION DE BASE DE DATOS DE ECOMERCE.
##  SERVIDOR DE PRODUCTOS Y CARRITOS CON EXPRESS, VISTAS CON EXPRESS-HANDLEBARS, BASE DE DATOS MANEJADA CON MONGOOSE HACIA MONGO ATLAS Y WEBSOCKET PARA CHAT CON SOCKETS.IO. 
## ADEMÁS TIENE MANEJO DE ARCHIVOS CON MULTER, MANEJO DE VARIABLES DE ENTORNO CON dotenv CAMBIO DE VARIABLES DE ENTORNO DURANTE EJECUCIÓN CON cross-env, SE MUESTRAN RUTAS EN TABLA EN CONSOLA LADO BACKEND CON express-routemap. 
### CORRESPODE A PREENTREGA 2 CLASE 17 MONGO AVANZADO PARTE II.
...

## Consigna. Se está requiriendo lo siguiente:
Deberás entregar el proyecto que has venido armando, cambiando persistencia en base de datos, además de agregar algunos endpoints nuevos a tu ecommerce.

## Profesionalizando la BD

### Objetivos generales

- Contarás con Mongo como sistema de persistencia principal. ((Hecho)).
- Tendrás definidos todos los endpoints para poder trabajar con productos y carritos.

### Objetivos específicos

- Profesionalizar las consultas de productos con filtros, paginación y ordenamientos.
- Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.

### Formato

- Link al repositorio de Github con el proyecto completo, sin la carpeta de Node_modules. ((Hecho)).

### Sugerencias

- Permitir comentarios en el archivo
- La lógica del negocio que ya tienes hecha no debería cambiar, sólo su persistencia. ((Hecho)).
- Los nuevos endpoints deben seguir la misma estructura y lógica que hemos seguido. ((Hecho)).

### Se debe entregar

- Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:
    - Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
        - -limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
        - page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1.
        - query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general.
        - sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento.
- El método GET deberá devolver un objeto con el siguiente formato:
    ```
    {
        status:success/error
        payload: Resultado de los productos solicitados
        totalPages: Total de páginas
        prevPage: Página anterior
        nextPage: Página siguiente
        page: Página actual
        hasPrevPage: Indicador para saber si la página previa existe
        hasNextPage: Indicador para saber si la página siguiente existe.
        prevLink: Link directo a la página previa (null si hasPrevPage=false)
        nextLink: Link directo a la página siguiente (null si hasNextPage=false)
    }
    ```
- Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.
- Además, agregar al router de carts los siguientes endpoints:
    - DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado ((Hecho)).
    - PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
    - PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body.
    - DELETE api/carts/:cid deberá eliminar todos los productos del carrito.
    - Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados. ((Hecho)).
- Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
    - Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
    - Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.
- Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 


# **Checklist  Pre- entrega**		
     
|Aspectos a evaluar|	Descripción	|
| ------ | ------ |
|Consigna|	Profesionalizar las consultas actuales de nuestro servidor express, ajustando la forma de solicitar los productos y agregando nuevos endpoints a los carritos.|	
|Productos|	Los productos se visualizan correctamente en la vista de productos ((Hecho)), y la misma cuenta con una paginación funcional. Además, pueden filtrarse por categoría o por disponibilidad, y ordenarse por precio de manera ascendente o descendente. |
|Carrito|   Los métodos DELETE eliminan correctamente los productos del carrito((Hecho)). Los métodos PUT actualizan correctamente los elementos del carrito. Se realiza correctamente un populate al momento de obtener un carrito. ((Hecho)). |
|Seguridad| La vista de productos muestra un mensaje de error si se pretende agregar una page inexistente? (p. ej. page=20003033 o page= -12323 o page = ASDASDASD).Los endpoints de carrito devuelven error si se desea colocar un :cid o un :pid inexistente. |
|Operación y formato|	El formato de productos y carrito es en inglés ((Hecho)). El proyecto corre con npm start ((Hecho)).	|


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