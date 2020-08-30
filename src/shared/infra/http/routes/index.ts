import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import incomeRouter from '@modules/incomes/infra/http/routes/income.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/session', sessionRouter);
routes.use('/incomes', incomeRouter);

export default routes;
