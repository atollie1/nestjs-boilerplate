import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);

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
