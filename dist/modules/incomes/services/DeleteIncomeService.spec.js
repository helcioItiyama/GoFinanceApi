"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _FakeIncomeRepository = _interopRequireDefault(require("../repositories/fakes/FakeIncomeRepository"));

var _DeleteIncomeService = _interopRequireDefault(require("./DeleteIncomeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeIncomeRepository;
let deleteIncome;
describe('DeleteIncome', () => {
  beforeEach(() => {
    fakeIncomeRepository = new _FakeIncomeRepository.default();
    deleteIncome = new _DeleteIncomeService.default(fakeIncomeRepository);
  });
  it('should be able to delete a specific income', async () => {
    const income1 = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10)
    });
    const income2 = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 3000,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10)
    });
    await deleteIncome.execute({
      id: income2.id,
      user_id: 'user_id'
    });
    const incomesList = await fakeIncomeRepository.listAllUserIncomes('user_id');
    expect(incomesList).toHaveLength(1);
    expect(incomesList).toEqual([income1]);
  });
  it('should not be able to delete an inexistent income', async () => {
    await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10)
    });
    await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 3000,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10)
    });
    await expect(deleteIncome.execute({
      id: 'inexistent_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to delete an income from another user', async () => {
    const User1Income = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: 'user2_id',
      date: new Date(2020, 8, 26, 10)
    });
    const User2Income = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 3000,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10)
    });
    await expect(deleteIncome.execute({
      id: User1Income.id,
      user_id: User2Income.user_id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});