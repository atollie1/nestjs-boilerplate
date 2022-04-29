import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './user-detail.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  user(@GetUser() user: User): User {
    return user;
  }
}
