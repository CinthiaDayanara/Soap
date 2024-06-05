import express from "express";
import bodyParser from "body-parser";
import { createClient } from "soap";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const url = "http://www.dneonline.com/calculator.asmx?wsdl";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/calcu.html");
});

app.post("/multiply", (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);

  createClient(url, (err, client) => {
    const args = { intA: num1, intB: num2 };
    client.Multiply(args, (err, result) => {
      res.json({ result: result.MultiplyResult });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor web iniciado en http://localhost:${port}`);
});
