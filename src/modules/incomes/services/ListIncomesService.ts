import { injectable, inject } from 'tsyringe';
import Income from '@modules/incomes/infra/typeorm/entities/Income';
import IIncomesRepository from '../repositories/IIncomesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListIncomesService {
  constructor(
    @inject('IncomesRepository')
    private incomesRepository: IIncomesRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Income[]> {
    const income = await this.incomesRepository.listAllUserIncomes(user_id);

    return income;
  }
}

export default ListIncomesService;
