"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockProducts = void 0;
const uuid_1 = require("uuid"); // Importo la función v4 de uuid para generar UUIDs aleatorios para cada elemento
// Creo varios elementos basados en el tipado integrados en un array, utilizando la función v4 para la creación de uuid que he importado.
// Para los campos de fecha, se utilizará el volor del momento en el que se instancia el objeto.
exports.mockProducts = [
    {
        id: (0, uuid_1.v4)(),
        name: "Product A",
        price: 10.0,
        stock: 100,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Product B",
        price: 20.0,
        stock: 50,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Product C",
        price: 30.0,
        stock: 200,
        is_active: false,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: (0, uuid_1.v4)(),
        name: "Product D",
        price: 40.0,
        stock: 75,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
    },
];
