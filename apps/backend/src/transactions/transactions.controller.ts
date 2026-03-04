import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ListTransactionsQuery } from './dto/list-transactions.query';
import { Transaction, User } from '@project-budget/database';
import { WorkOsAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(WorkOsAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(
    @CurrentUser() user: User,
    @Query() query: ListTransactionsQuery,
  ): Promise<Transaction[]> {
    return this.transactionsService.findAll(user.id, query);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Transaction> {
    return this.transactionsService.findOne(id, user.id);
  }

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() dto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.create(user.id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ): Promise<Transaction> {
    return this.transactionsService.remove(id, user.id);
  }
}
