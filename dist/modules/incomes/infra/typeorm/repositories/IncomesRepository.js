"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Income = _interopRequireDefault(require("../entities/Income"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IncomeRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Income.default);
  }

  async findById(id) {
    const income = await this.ormRepository.findOne(id);
    return income;
  }

  async listAllUserIncomes(user_id) {
    const listAllUserIncomes = await this.ormRepository.find({
      where: {
        user_id
      },
      order: {
        date: 'ASC'
      }
    });
    return listAllUserIncomes;
  }

  async deleteById(id) {
    await this.ormRepository.delete(id);
  }

  async create({
    date,
    type,
    user_id,
    value
  }) {
    const income = this.ormRepository.create({
      date,
      type,
      user_id,
      value
    });
    await this.ormRepository.save(income);
    return income;
  }

  async update(income) {
    return this.ormRepository.save(income);
  }

}

var _default = IncomeRepository;
exports.default = _default;