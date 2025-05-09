const app = require('./app');

const port = process.env.PORT || 3000; // se la variabile d'ambiente non è definita si lavora per convenzione sulla porta 3000

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
