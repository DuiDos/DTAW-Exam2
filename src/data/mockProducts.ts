// Importo la función v4 de uuid para generar UUIDs aleatorios para cada elemento
import { v4 as uuidv4 } from "uuid";

// Creo un tipo especial para que todos los elementos tenga ese tipo, siendo los campos obligatorios
export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

// Creo varios elementos basados en el tipado integrados en un array, utilizando la función v4 para la creación de uuid que he importado.
// Para los campos de fecha, se utilizará el volor del momento en el que se instancia el objeto.
// Para las pruebas del enrutado con id (get, patch, delete...) se ha cogido un uuid generado en una de las pruebas anteriores y se le ha asignado al "Product A"
export const mockProducts: Product[] = [
  {
    id: "29b5c7ab-3fce-447a-9d40-749dc0830d88",
    name: "Product A",
    price: 10.0,
    stock: 100,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Product B",
    price: 20.0,
    stock: 50,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Product C",
    price: 30.0,
    stock: 200,
    is_active: false,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: uuidv4(),
    name: "Product D",
    price: 40.0,
    stock: 75,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
