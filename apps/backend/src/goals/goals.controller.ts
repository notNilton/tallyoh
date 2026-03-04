import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal, User } from '@project-budget/database';
import { WorkOsAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(WorkOsAuthGuard)
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  findAll(@CurrentUser() user: User): Promise<Goal[]> {
    return this.goalsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<Goal> {
    return this.goalsService.findOne(id, user.id);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateGoalDto): Promise<Goal> {
    return this.goalsService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: UpdateGoalDto,
  ): Promise<Goal> {
    return this.goalsService.update(id, user.id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User): Promise<Goal> {
    return this.goalsService.remove(id, user.id);
  }
}
