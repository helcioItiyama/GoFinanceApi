import { injectable, inject } from 'tsyringe';
import AppError from '@shared/error/AppError';
import IIncomesRepository from '../repositories/IIncomesRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteIncomeService {
  constructor(
    @inject('IncomesRepository')
    private incomesRepository: IIncomesRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const income = await this.incomesRepository.findById(id);

    if (!income) {
      throw new AppError('This income does not exist');
    }

    if (income.user_id !== user_id) {
      throw new AppError('You are not allowed to delete this income');
    }

    await this.incomesRepository.deleteById(id);
  }
}

export default DeleteIncomeService;
