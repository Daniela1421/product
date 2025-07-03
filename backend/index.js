import express, { json } from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(json());

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
