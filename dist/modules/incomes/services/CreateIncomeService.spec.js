"use strict";

var _uuidv = require("uuidv4");

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _FakeIncomeRepository = _interopRequireDefault(require("../repositories/fakes/FakeIncomeRepository"));

var _CreateIncomeService = _interopRequireDefault(require("./CreateIncomeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeIncomeRepository;
let createIncome;
describe('CreateIncome', () => {
  beforeEach(() => {
    fakeIncomeRepository = new _FakeIncomeRepository.default();
    createIncome = new _CreateIncomeService.default(fakeIncomeRepository);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 26, 12).getTime();
    });
  });
  it('should be able to create an income', async () => {
    const income = await createIncome.execute({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: (0, _uuidv.uuid)(),
      date: new Date(2020, 8, 26, 10)
    });
    expect(income).toHaveProperty('id');
    expect(income.value).toEqual(2000.5);
  });
  it('should not be able to create an income on a future date', async () => {
    await expect(createIncome.execute({
      type: 'renda-fixa',
      value: 2000.5,
      user_id: (0, _uuidv.uuid)(),
      date: new Date(2020, 8, 27, 10)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an income with a null value', async () => {
    await expect(createIncome.execute({
      type: 'renda-fixa',
      value: 0,
      user_id: (0, _uuidv.uuid)(),
      date: new Date(2020, 8, 25, 10)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an income with a negative value', async () => {
    await expect(createIncome.execute({
      type: 'renda-fixa',
      value: -1000,
      user_id: (0, _uuidv.uuid)(),
      date: new Date(2020, 8, 25, 10)
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});