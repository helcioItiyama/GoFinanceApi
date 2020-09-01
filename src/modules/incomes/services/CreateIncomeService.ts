import { isAfter } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/error/AppError';
import Income from '@modules/incomes/infra/typeorm/entities/Income';
import IIncomesRepository from '../repositories/IIncomesRepository';

interface IRequest {
  type: string;
  value: number;
  user_id: string;
  date: Date;
}

@injectable()
class CreateIncomeService {
  constructor(
    @inject('IncomesRepository')
    private incomesRepository: IIncomesRepository,
  ) {}

  public async execute({
    type,
    value,
    user_id,
    date,
  }: IRequest): Promise<Income> {
    if (isAfter(date, Date.now())) {
      throw new AppError('You should not choose a date in the future');
    }

    if (value <= 0) {
      throw new AppError('You should enter a valid income value');
    }

    if (type !== 'renda-variavel' && type !== 'renda-fixa') {
      throw new AppError(
        'You should choose either renda-variavel or renda-fixa',
      );
    }

    const income = await this.incomesRepository.create({
      type,
      value,
      user_id,
      date,
    });

    return income;
  }
}

export default CreateIncomeService;
