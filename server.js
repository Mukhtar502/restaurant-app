require("dotenv").config();
const express = require("express");
const http = require("http");
const authRoutes = require("./routes/auth.router");
const dishRoutes = require("./routes/dish.router");
const orderRoutes = require("./routes/order.router");

const { connectDB } = require("./config/db");
const app = express();
const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/orders/", orderRoutes);
const server = http.createServer(app);
async function startServer() {
  await connectDB();
  server.listen(PORT, (error) => {
    if (error) {
      console.log(`server cannot be started: ${error}`);
    } else {
      console.log(`Server successfully started on port: ${PORT}`);
    }
  });
}
startServer();
