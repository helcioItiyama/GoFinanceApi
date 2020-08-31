"use strict";

var _FakeIncomeRepository = _interopRequireDefault(require("../repositories/fakes/FakeIncomeRepository"));

var _ListIncomesService = _interopRequireDefault(require("./ListIncomesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeIncomeRepository;
let listIncomes;
describe('ListIncomes', () => {
  beforeEach(() => {
    fakeIncomeRepository = new _FakeIncomeRepository.default();
    listIncomes = new _ListIncomesService.default(fakeIncomeRepository);
  });
  it('should be able to create an income', async () => {
    const income1 = await fakeIncomeRepository.create({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10)
    });
    const income2 = await fakeIncomeRepository.create({
      type: 'renda-variavel',
      value: 4000,
      user_id: 'user_id',
      date: new Date(2020, 8, 26, 10)
    });
    await fakeIncomeRepository.create({
      type: 'renda-variavel',
      value: 4000,
      user_id: 'anotherUser_id',
      date: new Date(2020, 8, 26, 10)
    });
    const incomes = await listIncomes.execute({
      user_id: 'user_id'
    });
    expect(incomes).toHaveLength(2);
    expect(incomes).toEqual([income1, income2]);
  });
});