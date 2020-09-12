const express = require('express');
const app = express();
const port = 5000;

// Enables CORS
const cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/',
	(req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(
`Example app listening on port ${port}!`));