"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeIUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeIUserRepository"));

var _AuthenticateUsersService = _interopRequireDefault(require("./AuthenticateUsersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let authenticateUsers;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeIUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUsers = new _AuthenticateUsersService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Helcio',
      email: 'helcio@teste.com.br',
      password: '123456'
    });
    const authenticated = await authenticateUsers.execute({
      email: 'helcio@teste.com.br',
      password: '123456'
    });
    expect(authenticated).toHaveProperty('token');
    expect(authenticated.user).toEqual(user);
  });
  it('should not be able to authenticate a user with an inexistent email', async () => {
    await fakeUsersRepository.create({
      name: 'Helcio',
      email: 'helcio@teste.com.br',
      password: '123456'
    });
    await expect(authenticateUsers.execute({
      email: 'helcio@teste.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate a user with an wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Helcio',
      email: 'helcio@teste.com.br',
      password: '123456'
    });
    await expect(authenticateUsers.execute({
      email: 'helcio@teste.com.br',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});