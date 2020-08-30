import { uuid } from 'uuidv4';
import AppError from '@shared/error/AppError';
import FakeIncomeRepository from '../repositories/fakes/FakeIncomeRepository';
import CreateIncomeService from './CreateIncomeService';

let fakeIncomeRepository: FakeIncomeRepository;
let createIncome: CreateIncomeService;

describe('CreateIncome', () => {
  beforeEach(() => {
    fakeIncomeRepository = new FakeIncomeRepository();
    createIncome = new CreateIncomeService(fakeIncomeRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 26, 12).getTime();
    });
  });

  it('should be able to create an income', async () => {
    const income = await createIncome.execute({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: uuid(),
      date: new Date(2020, 8, 26, 10),
    });

    expect(income).toHaveProperty('id');
    expect(income.value).toEqual(2000.5);
  });

  it('should not be able to create an income on a future date', async () => {
    await expect(
      createIncome.execute({
        type: 'renda-fixa',
        value: 2000.5,
        user_id: uuid(),
        date: new Date(2020, 8, 27, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an income with a null value', async () => {
    await expect(
      createIncome.execute({
        type: 'renda-fixa',
        value: 0,
        user_id: uuid(),
        date: new Date(2020, 8, 25, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an income with a negative value', async () => {
    await expect(
      createIncome.execute({
        type: 'renda-fixa',
        value: -1000,
        user_id: uuid(),
        date: new Date(2020, 8, 25, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
