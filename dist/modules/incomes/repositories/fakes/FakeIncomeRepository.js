"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Income = _interopRequireDefault(require("../../infra/typeorm/entities/Income"));

var _uuidv = require("uuidv4");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeIncomeRepository {
  constructor() {
    this.incomes = [];
  }

  async findById(id) {
    const income = this.incomes.find(eachIncome => eachIncome.id === id);
    return income;
  }

  async listAllUserIncomes(user_id) {
    const listAllUserIncomes = this.incomes.filter(eachIncome => eachIncome.user_id === user_id);
    return listAllUserIncomes;
  }

  async deleteById(id) {
    const incomesWithoutDeleted = this.incomes.filter(eachIncome => eachIncome.id !== id);
    this.incomes = incomesWithoutDeleted;
  }

  async create({
    date,
    type,
    user_id,
    value
  }) {
    const income = new _Income.default();
    Object.assign(income, {
      id: (0, _uuidv.uuid)(),
      date,
      type,
      user_id,
      value
    });
    this.incomes.push(income);
    return income;
  }

  async update(income) {
    const findIndex = this.incomes.findIndex(findIncome => findIncome.id === income.id);
    this.incomes[findIndex] = income;
    return income;
  }

}

var _default = FakeIncomeRepository;
exports.default = _default;