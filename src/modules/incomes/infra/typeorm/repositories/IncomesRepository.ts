import { getRepository, Repository } from 'typeorm';
import ICreateIncomeDTO from '@modules/incomes/dtos/ICreateIncomeDTO';
import IIncomesRepository from '@modules/incomes/repositories/IIncomesRepository';
import Income from '../entities/Income';

class IncomeRepository implements IIncomesRepository {
  private ormRepository: Repository<Income>;

  constructor() {
    this.ormRepository = getRepository(Income);
  }

  public async findById(id: string): Promise<Income | undefined> {
    const income = await this.ormRepository.findOne(id);
    return income;
  }

  public async listAllUserIncomes(user_id: string): Promise<Income[]> {
    const listAllUserIncomes = await this.ormRepository.find({
      where: { user_id },
      order: { date: 'ASC' },
    });

    return listAllUserIncomes;
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async create({
    date,
    type,
    user_id,
    value,
  }: ICreateIncomeDTO): Promise<Income> {
    const income = this.ormRepository.create({
      date,
      type,
      user_id,
      value,
    });
    await this.ormRepository.save(income);
    return income;
  }

  public async update(income: Income): Promise<Income> {
    return this.ormRepository.save(income);
  }
}

export default IncomeRepository;
