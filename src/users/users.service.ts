import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    return user;
  }

  findAll(): Promise<User[]> {
    const users = this.userRepository.find();

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`Cannot find user with id: ${id}`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    user.email = updateUserDto.email || user.email;
    user.username = updateUserDto.username || user.username;
    await this.userRepository.save(user);

    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
