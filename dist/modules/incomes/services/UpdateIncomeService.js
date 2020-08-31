"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _IIncomesRepository = _interopRequireDefault(require("../repositories/IIncomesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateIncomeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('IncomesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IIncomesRepository.default === "undefined" ? Object : _IIncomesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateIncomeService {
  constructor(incomesRepository) {
    this.incomesRepository = incomesRepository;
  }

  async execute({
    id,
    type,
    value,
    date,
    user_id
  }) {
    const income = await this.incomesRepository.findById(id);

    if (!income) {
      throw new _AppError.default('This income does not exist!');
    }

    if (income.user_id !== user_id) {
      throw new _AppError.default('You are not allowed to update this income');
    }

    income.type = type;
    income.value = value;
    income.date = date;
    await this.incomesRepository.update(income);
    return income;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateIncomeService;
exports.default = _default;