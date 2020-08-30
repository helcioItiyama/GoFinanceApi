import AppError from '@shared/error/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeIUserRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Helcio',
      email: 'helcio@teste.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('helcio@teste.com.br');
  });

  it('should not be able to create a user with an existent email', async () => {
    await createUser.execute({
      name: 'Helcio',
      email: 'test@teste.com.br',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Helcio',
        email: 'test@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
