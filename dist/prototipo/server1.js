"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Importo los productos mock con la ruta correcta de la ubicación
const mockProducts_js_1 = require("../data/mockProducts.js");
// Importo la función v4 de uuid para generar UUIDs aleatorios para el endpoint POST
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const port = 3000;
// Uso JSON middleware para poder manejar datos en formato JSON que es como los vamos a recibir
app.use(express_1.default.json());
// Defino los endpoints
// GET /products: Devuelve la lista de productos
// Se recibe la lista completa sin realizar ninguna modificación.
app.get("/products", (req, res) => {
    res.json(mockProducts_js_1.mockProducts); // Retorna todos los productos sin modificar nada
});
// GET /products/:id: Devuelve un producto por su id
// Se utiliza para las pruebas el id del "Product A" que es estático en la definición del objeto
app.get("/products/:id", (req, res) => {
    // Extraigo el id de la url
    const { id } = req.params;
    // BuscO el producto por su id
    const product = mockProducts_js_1.mockProducts.find((product) => product.id === id);
    if (product) {
        // Si lo encontra, se devuelve tal cual
        res.json(product);
    }
    else {
        // Si no lo encuentra, devuelve el error 404 (por ser el estándar que se utiliza, al igual que el mensaje, se podría identificar con cualquier texto o código de error que se desee)
        res.status(404).json("Product not found");
    }
});
// POST /products: Crea un nuevo producto con los datos aleatorios creados por defecto
app.post("/products", (req, res) => {
    // Se recogen los datos del producto desde el body de la solicitud
    const newProduct = req.body;
    // Se recogen los parámetros de la URL
    const { price, stock, name } = req.query;
    // Si los parámetros existen en la URL, se agregan al nuevo producto
    const newProductWithParams = {
        ...newProduct,
        // Se convierte a número, si se pasa el parámetro, si no undefined
        price: price ? parseFloat(price) : undefined,
        // Se convierte a número, si se pasa el parámetro, si no undefined
        stock: stock ? parseInt(stock) : undefined,
        // Se incluye si existe
        name: name ? name : undefined,
    };
    // Se genera un id único con UUID
    const newId = (0, uuid_1.v4)();
    // Se instancia un objeto Date para la fecha de creación
    const createdAt = new Date();
    // Se crea la fecha de actualización para que sea la misma de creación (al menos en el momento de creación del objeto)
    const updatedAt = createdAt;
    // Se crea el nuevo producto con los parámetros de la URL y los datos del body
    const newProductWithId = {
        ...newProductWithParams,
        id: newId,
        created_at: createdAt,
        updated_at: updatedAt,
    };
    // Añado el nuevo producto al array de productos (en este supuesto de práctica)
    mockProducts_js_1.mockProducts.push(newProductWithId);
    // Se devuelve la respuesta con el nuevo producto creado
    res.status(201).json({
        ...newProductWithId,
        created_at: newProductWithId.created_at,
        updated_at: newProductWithId.updated_at,
    });
});
// PATCH /products/:id: Actualiza un producto por su id
app.patch("/products/:id", (req, res) => {
    const { id } = req.params;
    // Los datos que se quieren actualizar desde el body
    const updatedData = req.body;
    // Acceder a los parámetros de la URL (query)
    const { price, stock } = req.query;
    // Si existen los parámetros en la URL, se actualizan
    // Como en el POST, se convierten los valores a número
    if (price)
        updatedData.price = parseFloat(price);
    if (stock)
        updatedData.stock = parseInt(stock);
    // Busco el producto en el array
    const productIndex = mockProducts_js_1.mockProducts.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        // Si no se encuentra, error 404
        return res.status(404).json("Product not found");
    }
    const productToUpdate = mockProducts_js_1.mockProducts[productIndex];
    // Actualizo el producto con los datos del body y los parámetros de la URL
    const updatedProduct = {
        ...productToUpdate,
        ...updatedData,
        // Actualizo la fecha de actualización con un nuevo objeto Date
        updated_at: new Date(),
    };
    mockProducts_js_1.mockProducts[productIndex] = updatedProduct; // Reemplazamos el producto actualizado
    res.json({
        ...updatedProduct,
        created_at: updatedProduct.created_at,
        updated_at: updatedProduct.updated_at,
    }); // Respondemos con el producto actualizado
});
// DELETE /products/:id: Elimina un producto por su id
app.delete("/products/:id", (req, res) => {
    const { id } = req.params; // Obtener el id del producto desde los parámetros de la URL
    // Verifica que se haya proporcionado un id en la URL
    console.log(`El id recibido es: ${id}`);
    // Buscamos el producto a eliminar en el array mockProducts
    const productIndex = mockProducts_js_1.mockProducts.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        // Si no se encuentra el producto, respondemos con un error 404
        console.log("Producto no encontrado");
        return res.status(404).json("Product not found");
    }
    // Elimino el producto del array mockProducts
    mockProducts_js_1.mockProducts.splice(productIndex, 1);
    // Respondemos con status 204 (sin contenido) para indicar que la operación fue exitosa
    console.log("Producto eliminado exitosamente");
    res.status(204).send();
});
// Inicia el servidor en el puerto definido (en la cabecera del fichero)
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
