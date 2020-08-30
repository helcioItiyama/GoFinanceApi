import { container } from 'tsyringe';

import '@modules/users/providers';
// import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IIncomesRepository from '@modules/incomes/repositories/IIncomesRepository';
import IncomesRepository from '@modules/incomes/infra/typeorm/repositories/IncomesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IIncomesRepository>(
  'IncomesRepository',
  IncomesRepository,
);
