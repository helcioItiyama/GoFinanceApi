"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _IncomesRepository = _interopRequireDefault(require("../../modules/incomes/infra/typeorm/repositories/IncomesRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('IncomesRepository', _IncomesRepository.default);