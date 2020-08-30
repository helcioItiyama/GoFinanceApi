import ICreateIncomeDTO from '@modules/incomes/dtos/ICreateIncomeDTO';
import IIncomesRepository from '@modules/incomes/repositories/IIncomesRepository';
import Income from '@modules/incomes/infra/typeorm/entities/Income';
import { uuid } from 'uuidv4';

class FakeIncomeRepository implements IIncomesRepository {
  private incomes: Income[] = [];

  public async findById(id: string): Promise<Income | undefined> {
    const income = this.incomes.find(eachIncome => eachIncome.id === id);
    return income;
  }

  public async listAllUserIncomes(user_id: string): Promise<Income[]> {
    const listAllUserIncomes = this.incomes.filter(
      eachIncome => eachIncome.user_id === user_id,
    );
    return listAllUserIncomes;
  }

  public async deleteById(id: string): Promise<void> {
    const incomesWithoutDeleted = this.incomes.filter(
      eachIncome => eachIncome.id !== id,
    );
    this.incomes = incomesWithoutDeleted;
  }

  public async create({
    date,
    type,
    user_id,
    value,
  }: ICreateIncomeDTO): Promise<Income> {
    const income = new Income();
    Object.assign(income, {
      id: uuid(),
      date,
      type,
      user_id,
      value,
    });
    this.incomes.push(income);
    return income;
  }

  public async update(income: Income): Promise<Income> {
    const findIndex = this.incomes.findIndex(
      findIncome => findIncome.id === income.id,
    );
    this.incomes[findIndex] = income;
    return income;
  }
}

export default FakeIncomeRepository;
