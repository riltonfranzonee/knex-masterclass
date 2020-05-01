const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json())
app.use(routes);

app.use((err, req, res, next) => {
  const error = new Error('Not found');
  err.status = 404;
  next(err)
})


app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({err: err.message})
})

app.listen(3333, () => console.log('Server running on port 3333'));