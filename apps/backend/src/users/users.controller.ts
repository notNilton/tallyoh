import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@project-budget/database';

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
  upsertFromWorkos(
    @Body()
    data: {
      workosId: string;
      email: string;
      name?: string;
      avatarUrl?: string;
    },
  ): Promise<User> {
    return this.usersService.upsertFromWorkos(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
