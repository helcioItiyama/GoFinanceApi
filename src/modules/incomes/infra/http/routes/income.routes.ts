import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import IncomeController from '../controllers/IncomeController';

const incomeRouter = Router();
const incomeController = new IncomeController();

incomeRouter.use(ensureAuthenticated);

incomeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
      value: Joi.number().positive().required(),
      date: Joi.date().required(),
    },
  }),
  incomeController.create,
);

incomeRouter.get('/', incomeController.list);

incomeRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
      value: Joi.number().positive().required(),
      date: Joi.date().required(),
    },
  }),
  incomeController.update,
);

incomeRouter.delete('/:id', incomeController.delete);

export default incomeRouter;
