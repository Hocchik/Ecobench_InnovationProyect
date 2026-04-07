import express from 'express';
import cors from 'cors';
import benchmarkRoutes from './routes/benchmarkRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', benchmarkRoutes);

app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});
