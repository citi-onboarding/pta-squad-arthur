import routes from "./routes";
import dotenv from "dotenv";
import express from "express";
import "@database";
import { errorHandler } from "./middlewares/errorHandler"

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);

const PORT = process.env.PORT || process.env.SERVER_PORT || 3001;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log("📦 Server running");
});
