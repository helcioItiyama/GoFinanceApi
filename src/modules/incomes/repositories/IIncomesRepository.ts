import ICreateIncomeDTO from '../dtos/ICreateIncomeDTO';
import Income from '../infra/typeorm/entities/Income';

export default interface IIncomesRepository {
  findById(id: string): Promise<Income | undefined>;

  listAllUserIncomes(user_id: string): Promise<Income[]>;

  create(data: ICreateIncomeDTO): Promise<Income>;

  deleteById(id: string): Promise<void>;

  update(income: Income): Promise<Income>;
}
