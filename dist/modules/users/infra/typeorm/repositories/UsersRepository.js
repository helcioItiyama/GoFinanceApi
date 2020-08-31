"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findById(id) {
    const user = this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email) {
    const user = this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async create({
    name,
    email,
    password
  }) {
    const user = this.ormRepository.create({
      name,
      email,
      password
    });
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    return this.ormRepository.save(user);
  }

}

var _default = UserRepository;
exports.default = _default;