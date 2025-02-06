const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "SE Shop REST API",
    description: "RESTful API for SE Shop",
    contact: {
      name: "Worachet Uttha",
      url: "https://pws.npru.ac.th/wuttha",
      email: "wuttha@webmail.npru.ac.th",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local Development Server",
    },
    {
      url: "https://your-deployment-url.com",
      description: "Production Server",
    },
  ],
  tags: [
    {
      name: "Product",
      description: "APIs related to product management",
    },
    {
      name: "Cart",
      description: "APIs related to cart management",
    },
  ],
  components: {
    schemas: {
      // 🔹 Product Schema
      Product: {
        type: "object",
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          description: { type: "string" },
          image: { type: "string" },
          price: { type: "number" },
        },
      },
      NewProduct: {
        name: "Mechanical Keyboard",
        description: "A mechanical keyboard with RGB lighting",
        price: 100,
        category: "gadget",
      },
      ProductResponse: {
        name: "Mechanical Keyboard",
        description: "A mechanical keyboard with RGB lighting",
        image:
          "https://firebasestorage.googleapis.com/v0/b/component-431e1.firebasestorage.app/o/se-shop%2Fupload%2F71fRP7KY9hL._AC_SL1500_.jpg?alt=media&token=f63134ce-67a9-4dda-af12-c6d54b70fdc3",
        price: 100,
        category: "gadget",
      },

      // 🔹 Cart Schema
      Cart: {
        type: "object",
        properties: {
          productId: { type: "string" },
          name: { type: "string" },
          price: { type: "number" },
          image: { type: "string" },
          quantity: { type: "integer" },
          email: { type: "string" },
        },
      },
      CartResponse: {
        productId: "123456",
        name: "Mechanical Keyboard",
        price: 100,
        image:
          "https://firebasestorage.googleapis.com/v0/b/component-431e1.firebasestorage.app/o/se-shop%2Fupload%2F71fRP7KY9hL._AC_SL1500_.jpg?alt=media&token=f63134ce-67a9-4dda-af12-c6d54b70fdc3",
        quantity: 2,
        email: "user@example.com",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = [
  "./index.js",
  "./routes/productRoutes.js",
  "./routes/cartRoutes.js",
];

// 🔹 สร้างเอกสาร Swagger
swaggerAutogen(outputFile, routes, doc);