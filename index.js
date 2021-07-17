const express = require("express");
const app = express();

app.use(express.json()); 

// Import all products CRUD processes from router
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./Routes/userRoutes");

const PORT = 3000;

// Set base route to "localhost:PORT/products"...
app.use("/products", productRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));