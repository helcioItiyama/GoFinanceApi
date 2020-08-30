import AppError from '@shared/error/AppError';
import FakeIncomeRepository from '../repositories/fakes/FakeIncomeRepository';
import UpdateIncomeService from './UpdateIncomeService';

let fakeIncomeRepository: FakeIncomeRepository;
let updateIncome: UpdateIncomeService;

describe('UpdateIncome', () => {
  beforeEach(() => {
    fakeIncomeRepository = new FakeIncomeRepository();
    updateIncome = new UpdateIncomeService(fakeIncomeRepository);
  });

  it('should be able to update a specific income', async () => {
    const anotherIncome = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10),
    });

    const income = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 3000,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10),
    });

    await updateIncome.execute({
      id: income.id,
      type: 'renda-variavel',
      value: 2000,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10),
    });

    expect(income.type).toBe('renda-variavel');
    expect(income.value).toBe(2000);
    expect(anotherIncome.type).toBe('renda-fixa');
    expect(anotherIncome.value).toBe(2000.5);
  });

  it('should not be able to update an inexistent income', async () => {
    await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10),
    });

    await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 3000,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10),
    });

    await expect(
      updateIncome.execute({
        id: 'inexistent_id',
        type: 'renda-variavel',
        value: 2000,
        user_id: 'user_id',
        date: new Date(2020, 8, 26, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an income from another user', async () => {
    const User1Income = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: 'user2_id',
      date: new Date(2020, 8, 26, 10),
    });

    const User2Income = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 3000,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10),
    });

    await expect(
      updateIncome.execute({
        id: User1Income.id,
        type: 'renda-variavel',
        value: 2000,
        user_id: User2Income.user_id,
        date: new Date(2020, 8, 26, 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
