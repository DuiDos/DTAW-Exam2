import express, { Request, Response } from "express";
// Importo los productos mock con la ruta correcta de la ubicación
import { mockProducts, Product } from "../data/mockProducts.js";
// Importo la función v4 de uuid para generar UUIDs aleatorios para el endpoint POST
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

// Uso JSON middleware para poder manejar datos en formato JSON que es como los vamos a recibir
app.use(express.json());

// Defino los endpoints

// GET /products: Devuelve la lista de productos
// Se recibe la lista completa sin realizar ninguna modificación.
app.get("/products", (req: Request, res: Response) => {
  res.json(mockProducts); // Retorna todos los productos sin modificar nada
});

// GET /products/:id: Devuelve un producto por su id
// Se utiliza para las pruebas el id del "Product A" que es estático en la definición del objeto
app.get("/products/:id", (req: Request, res: Response) => {
  // Extraigo el id de la url
  const { id } = req.params;
  // BuscO el producto por su id
  const product = mockProducts.find((product) => product.id === id);

  if (product) {
    // Si lo encontra, se devuelve tal cual
    res.json(product);
  } else {
    // Si no lo encuentra, devuelve el error 404 (por ser el estándar que se utiliza, al igual que el mensaje, se podría identificar con cualquier texto o código de error que se desee)
    res.status(404).json("Product not found");
  }
});

// POST /products: Crea un nuevo producto con los datos aleatorios creados por defecto
app.post("/products", (req: Request, res: Response) => {
  // Se recogen los datos del producto desde el body de la solicitud
  const newProduct: Product = req.body;
  console.log(req.body);
  // Se genera un id único con UUID
  const newId = uuidv4();
  // Se instancia un objeto Date para la fecha de creación
  const createdAt = new Date();
  // Se crea la fecha de actualización para que sea la misma de creación (al menos en el momento de creación del objeto)
  const updatedAt = createdAt;

  const newProductWithId = {
    ...newProduct,
    id: newId,
    created_at: createdAt,
    updated_at: updatedAt,
  };

  // Añado el nuevo producto al array de productos (en este supuesto de práctica)
  mockProducts.push(newProductWithId);
  res.status(201).json({
    ...newProductWithId,
    created_at: newProductWithId.created_at,
    updated_at: newProductWithId.updated_at,
  });
});

// PATCH /products/:id: Actualiza un producto por su id
app.patch("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  // Los datos que se quieren actualizar
  const updatedData = req.body;

  // Busco el producto en el array
  const productIndex = mockProducts.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    // Si no se encuentra, error 404
    return res.status(404).json({ message: "Product not found" });
  }

  const productToUpdate = mockProducts[productIndex];
  const updatedProduct = {
    ...productToUpdate,
    ...updatedData,
    // Actualizo la fecha de actualización con un nuevo objeto Date
    updated_at: new Date(),
  };

  mockProducts[productIndex] = updatedProduct; // Reemplazamos el producto actualizado
  res.json({
    ...updatedProduct,
    created_at: updatedProduct.created_at,
    updated_at: updatedProduct.updated_at,
  }); // Respondemos con el producto actualizado
});

// DELETE /products/:id: Elimina un producto por su id
app.delete("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  // Buscamos el producto a eliminar
  const productIndex = mockProducts.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    // Si no se encuentra, error 404
  }
  return res.status(404).json({ message: "Product not found" });

  // Elimino el producto del array
  mockProducts.splice(productIndex, 1);
  // Se responde con status 204, que indica que la operación fue exitosa pero sin contenido
  res.status(204).send();
});

// Inicia el servidor en el puerto definido (en la cabecera del fichero)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
