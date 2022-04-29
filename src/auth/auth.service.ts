import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository
      .createQueryBuilder('users')
      .addSelect(['users.id', 'users.email', 'users.password'])
      .where('email = :email', { email })
      .getOne();

    if (!user && !(await bcrypt.compareSync(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };
    const token = await this.jwtService.sign(payload);

    return {
      id: user.id,
      email: user.email,
      token: token,
    };
  }
}
