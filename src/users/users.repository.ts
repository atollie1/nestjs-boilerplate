import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    await this.save(user);

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.createQueryBuilder('users')
      .addSelect(['users.id', 'users.name', 'users.email', 'users.password'])
      .where('users.email = :email', { email })
      .getOne();

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    user.email = updateUserDto.email || user.email;
    user.name = updateUserDto.name || user.name;
    await this.save(user);

    return user;
  }
}
