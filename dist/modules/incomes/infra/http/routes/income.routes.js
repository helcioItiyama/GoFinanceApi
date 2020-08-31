"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticate = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticate"));

var _IncomeController = _interopRequireDefault(require("../controllers/IncomeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const incomeRouter = (0, _express.Router)();
const incomeController = new _IncomeController.default();
incomeRouter.use(_ensureAuthenticate.default);
incomeRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    type: _celebrate.Joi.string().required(),
    value: _celebrate.Joi.number().positive().required(),
    date: _celebrate.Joi.date().required()
  }
}), incomeController.create);
incomeRouter.get('/', incomeController.list);
incomeRouter.put('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    type: _celebrate.Joi.string().required(),
    value: _celebrate.Joi.number().positive().required(),
    date: _celebrate.Joi.date().required()
  }
}), incomeController.update);
incomeRouter.delete('/:id', incomeController.delete);
var _default = incomeRouter;
exports.default = _default;