"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateIncomeService = _interopRequireDefault(require("../../../services/CreateIncomeService"));

var _ListIncomesService = _interopRequireDefault(require("../../../services/ListIncomesService"));

var _UpdateIncomeService = _interopRequireDefault(require("../../../services/UpdateIncomeService"));

var _DeleteIncomeService = _interopRequireDefault(require("../../../services/DeleteIncomeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IncomeController {
  async create(request, response) {
    const {
      type,
      value,
      date
    } = request.body;
    const user_id = request.user.id;

    const createIncome = _tsyringe.container.resolve(_CreateIncomeService.default);

    const income = await createIncome.execute({
      type,
      value,
      user_id,
      date
    });
    return response.json(income);
  }

  async list(request, response) {
    const user_id = request.user.id;

    const listIncomes = _tsyringe.container.resolve(_ListIncomesService.default);

    const incomes = await listIncomes.execute({
      user_id
    });
    return response.json(incomes);
  }

  async update(request, response) {
    const {
      date,
      type,
      value
    } = request.body;
    const {
      id
    } = request.params;
    const user_id = request.user.id;

    const updatedIncome = _tsyringe.container.resolve(_UpdateIncomeService.default);

    const incomes = await updatedIncome.execute({
      id,
      date,
      type,
      value,
      user_id
    });
    return response.json(incomes);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;
    const user_id = request.user.id;

    const deleteIncome = _tsyringe.container.resolve(_DeleteIncomeService.default);

    await deleteIncome.execute({
      id,
      user_id
    });
    return response.status(204).json();
  }

}

exports.default = IncomeController;