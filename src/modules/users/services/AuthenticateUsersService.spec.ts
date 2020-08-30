import AppError from '@shared/error/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeIUserRepository';
import AuthenticateUsersService from './AuthenticateUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUsers: AuthenticateUsersService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUsers = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Helcio',
      email: 'helcio@teste.com.br',
      password: '123456',
    });

    const authenticated = await authenticateUsers.execute({
      email: 'helcio@teste.com.br',
      password: '123456',
    });

    expect(authenticated).toHaveProperty('token');
    expect(authenticated.user).toEqual(user);
  });

  it('should not be able to authenticate a user with an inexistent email', async () => {
    await fakeUsersRepository.create({
      name: 'Helcio',
      email: 'helcio@teste.com.br',
      password: '123456',
    });

    await expect(
      authenticateUsers.execute({
        email: 'helcio@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user with an wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Helcio',
      email: 'helcio@teste.com.br',
      password: '123456',
    });

    await expect(
      authenticateUsers.execute({
        email: 'helcio@teste.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
