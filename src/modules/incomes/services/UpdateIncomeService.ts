import { injectable, inject } from 'tsyringe';
import AppError from '@shared/error/AppError';
import Income from '@modules/incomes/infra/typeorm/entities/Income';
import IIncomesRepository from '../repositories/IIncomesRepository';

interface IRequest {
  id: string;
  type: string;
  value: number;
  user_id: string;
  date: Date;
}

@injectable()
class UpdateIncomeService {
  constructor(
    @inject('IncomesRepository')
    private incomesRepository: IIncomesRepository,
  ) {}

  public async execute({
    id,
    type,
    value,
    date,
    user_id,
  }: IRequest): Promise<Income> {
    const income = await this.incomesRepository.findById(id);

    if (!income) {
      throw new AppError('This income does not exist!');
    }

    if (income.user_id !== user_id) {
      throw new AppError('You are not allowed to update this income');
    }

    if (type !== 'renda-variavel' && type !== 'renda-fixa') {
      throw new AppError(
        'You should choose either renda-variavel or renda-fixa',
      );
    }

    income.type = type;
    income.value = value;
    income.date = date;

    await this.incomesRepository.update(income);

    return income;
  }
}

export default UpdateIncomeService;
