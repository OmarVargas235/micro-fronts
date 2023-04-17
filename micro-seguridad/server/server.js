const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors');
var port = 80;
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname)));
app.listen(port, () => {
  console.log(`Aplicación factoring ejecutada correctamente en el puerto ${port} `);
});