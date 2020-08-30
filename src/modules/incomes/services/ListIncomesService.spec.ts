import FakeIncomeRepository from '../repositories/fakes/FakeIncomeRepository';
import ListIncomesService from './ListIncomesService';

let fakeIncomeRepository: FakeIncomeRepository;
let listIncomes: ListIncomesService;

describe('ListIncomes', () => {
  beforeEach(() => {
    fakeIncomeRepository = new FakeIncomeRepository();
    listIncomes = new ListIncomesService(fakeIncomeRepository);
  });

  it('should be able to create an income', async () => {
    const income1 = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10),
    });

    const income2 = await fakeIncomeRepository.create({
      type: 'renda-variavel',
      value: 4000,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10),
    });

    await fakeIncomeRepository.create({
      type: 'renda-variavel',
      value: 4000,
      user_id: 'anotherUser_id',
      date: new Date(2020, 8, 26, 10),
    });

    const incomes = await listIncomes.execute({ user_id: 'user_id' });

    expect(incomes).toHaveLength(2);
    expect(incomes).toEqual([income1, income2]);
  });
});
