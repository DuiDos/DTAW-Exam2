"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mockProducts_js_1 = require("../data/mockProducts.js"); // Importamos los productos mock
const uuid_1 = require("uuid"); // Importamos uuidv4 para generar UUIDs
const app = (0, express_1.default)();
const port = 3000;
// Usamos JSON middleware para poder manejar datos en formato JSON
app.use(express_1.default.json());
// Definimos los endpoints
// GET /products: Devuelve la lista de productos
app.get("/products", (req, res) => {
    const responseProducts = mockProducts_js_1.mockProducts.map((product) => ({
        ...product,
        created_at: product.created_at.toISOString(), // Convertimos Date a ISO string
        updated_at: product.updated_at.toISOString(), // Convertimos Date a ISO string
    }));
    res.json(responseProducts); // Retorna todos los productos
});
// GET /products/:id: Devuelve un producto por su id
app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = mockProducts_js_1.mockProducts.find((p) => p.id === id); // Buscamos el producto por su id
    if (product) {
        res.json({
            ...product,
            created_at: product.created_at.toISOString(),
            updated_at: product.updated_at.toISOString(),
        }); // Si lo encontramos, lo devolvemos con las fechas en formato ISO
    }
    else {
        res.status(404).json({ message: "Product not found" }); // Si no lo encontramos, error 404
    }
});
// POST /products: Crea un nuevo producto
app.post("/products", (req, res) => {
    const newProduct = req.body; // Tomamos el producto desde el cuerpo de la solicitud
    const newId = (0, uuid_1.v4)(); // Generamos un id único con UUID
    const createdAt = new Date(); // Usamos un objeto Date para la fecha de creación
    const updatedAt = createdAt; // La fecha de actualización es la misma
    const newProductWithId = {
        ...newProduct,
        id: newId,
        created_at: createdAt,
        updated_at: updatedAt,
    };
    mockProducts_js_1.mockProducts.push(newProductWithId); // Añadimos el nuevo producto al array de productos
    res.status(201).json({
        ...newProductWithId,
        created_at: newProductWithId.created_at.toISOString(),
        updated_at: newProductWithId.updated_at.toISOString(),
    }); // Respondemos con el producto creado, con fechas en formato ISO
});
// PATCH /products/:id: Actualiza un producto por su id
/* app.patch("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body; // Los datos que se quieren actualizar

  const productIndex = mockProducts.findIndex((p) => p.id === id); // Buscamos el producto en el array
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" }); // Si no se encuentra, error 404
  }

  const productToUpdate = mockProducts[productIndex];
  const updatedProduct = {
    ...productToUpdate,
    ...updatedData,
    updated_at: new Date(), // Actualizamos la fecha de actualización con un nuevo objeto Date
  };

  mockProducts[productIndex] = updatedProduct; // Reemplazamos el producto actualizado
  res.json({
    ...updatedProduct,
    created_at: updatedProduct.created_at.toISOString(), // Convertimos Date a ISO string
    updated_at: updatedProduct.updated_at.toISOString(),
  }); // Respondemos con el producto actualizado
});

// DELETE /products/:id: Elimina un producto por su id
app.delete("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const productIndex = mockProducts.findIndex((p) => p.id === id); // Buscamos el producto a eliminar

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" }); // Si no se encuentra, error 404
  }

  mockProducts.splice(productIndex, 1); // Eliminamos el producto del array
  res.status(204).send(); // Respondemos con status 204, que indica que la operación fue exitosa pero sin contenido
}); */
// Iniciamos el servidor en el puerto definido
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
