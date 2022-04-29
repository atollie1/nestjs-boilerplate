import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneParamDto } from './dto/find-one-param.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParamDto) {
    return this.usersService.findOne(params.id);
  }

  @Patch(':id')
  update(
    @Param() params: FindOneParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParamDto) {
    return this.usersService.remove(params.id);
  }
}
