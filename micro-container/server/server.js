const express = require("express");
const path = require("path");
const app = express();
const port = 80;
app.use(express.static(path.join(__dirname)));
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "service-worker.js"));
});
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(port, () => {
  console.log(
    `Aplicación contenedora ejecutada correctamente en el puerto ${port} `
  );
});
