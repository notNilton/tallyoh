import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@project-budget/database';
import { UpsertUserDto } from './dto/upsert-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('workos/:workosId')
  findByWorkosId(@Param('workosId') workosId: string): Promise<User | null> {
    return this.usersService.findByWorkosId(workosId);
  }

  @Post('upsert')
  upsertFromWorkos(@Body() dto: UpsertUserDto): Promise<User> {
    return this.usersService.upsertFromWorkos(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
