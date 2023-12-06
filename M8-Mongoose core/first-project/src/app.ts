/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/Routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);

// const test = (req: Request, res: Response) => {

//   const a = 10;
//   res.send({ a })
// }
// app.get('/', test);

app.get('/', (req: Request, res: Response) => {
  res.send('First Project Server is Running on vercel!');
});

app.use(globalErrorHandler);
//route not found
app.use(notFound);
export default app;
