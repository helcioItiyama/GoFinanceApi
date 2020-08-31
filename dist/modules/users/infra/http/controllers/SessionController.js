"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _AuthenticateUsersService = _interopRequireDefault(require("../../../services/AuthenticateUsersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticateUsers = _tsyringe.container.resolve(_AuthenticateUsersService.default);

    const {
      user,
      token
    } = await authenticateUsers.execute({
      email,
      password
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

exports.default = UserController;