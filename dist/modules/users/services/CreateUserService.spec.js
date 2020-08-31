"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/error/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeIUserRepository = _interopRequireDefault(require("../repositories/fakes/FakeIUserRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUser;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeIUserRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Helcio',
      email: 'helcio@teste.com.br',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('helcio@teste.com.br');
  });
  it('should not be able to create a user with an existent email', async () => {
    await createUser.execute({
      name: 'Helcio',
      email: 'test@teste.com.br',
      password: '123456'
    });
    await expect(createUser.execute({
      name: 'Helcio',
      email: 'test@teste.com.br',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});