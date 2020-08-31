"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _IIncomesRepository = _interopRequireDefault(require("../repositories/IIncomesRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateIncomeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('IncomesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IIncomesRepository.default === "undefined" ? Object : _IIncomesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateIncomeService {
  constructor(incomesRepository) {
    this.incomesRepository = incomesRepository;
  }

  async execute({
    type,
    value,
    user_id,
    date
  }) {
    if ((0, _dateFns.isAfter)(date, Date.now())) {
      throw new _AppError.default('You should not choose a date in the future');
    }

    if (value <= 0) {
      throw new _AppError.default('You should enter a valid income value');
    }

    const income = await this.incomesRepository.create({
      type,
      value,
      user_id,
      date
    });
    return income;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateIncomeService;
exports.default = _default;