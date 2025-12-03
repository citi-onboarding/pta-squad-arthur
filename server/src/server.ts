import dotenv from "dotenv";
dotenv.config();

import routes from "./routes";
import express from "express";
import cors from "cors";
import "@database";
import { errorHandler } from "./middlewares/errorHandler"
import { emailRoutes } from "./routes/EmailRoutes";

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(routes);
app.use(express.static(__dirname + "/public"));
app.use(emailRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || process.env.SERVER_PORT || 3001;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log("📦 Server running");
});